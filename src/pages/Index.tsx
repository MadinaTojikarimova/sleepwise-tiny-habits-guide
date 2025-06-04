
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Moon, Star, Clock, Calendar, Heart, Plus, X, Edit3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SleepQuotes from "@/components/SleepQuotes";
import SleepCalendar from "@/components/SleepCalendar";
import { useSleepData } from "@/hooks/useSleepData";

const SleepWise = () => {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [bedtimeGoal] = useState("22:30");
  const [newTaskText, setNewTaskText] = useState("");
  const [isAddingTask, setIsAddingTask] = useState(false);
  
  // Move routine items state to top level to fix hook ordering
  const [routineItems, setRoutineItems] = useState([
    { id: 1, text: "Turn off all screens", completed: false },
    { id: 2, text: "Dim the lights", completed: false },
    { id: 3, text: "Take deep breaths", completed: false },
    { id: 4, text: "Write in gratitude journal", completed: false }
  ]);
  
  const { sleepEntries, addSleepEntry } = useSleepData();
  const { toast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const isNearBedtime = () => {
    const now = new Date();
    const currentTimeStr = now.toTimeString().slice(0, 5);
    const bedtimeDate = new Date();
    const [hours, minutes] = bedtimeGoal.split(':');
    bedtimeDate.setHours(parseInt(hours), parseInt(minutes));
    
    const timeDiff = bedtimeDate.getTime() - now.getTime();
    return timeDiff <= 3600000 && timeDiff > 0; // Within 1 hour before bedtime
  };

  const getTimeUntilBedtime = () => {
    const now = new Date();
    const bedtimeDate = new Date();
    const [hours, minutes] = bedtimeGoal.split(':');
    bedtimeDate.setHours(parseInt(hours), parseInt(minutes));
    
    if (bedtimeDate < now) {
      bedtimeDate.setDate(bedtimeDate.getDate() + 1);
    }
    
    const timeDiff = bedtimeDate.getTime() - now.getTime();
    const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    
    return { hours: hoursLeft, minutes: minutesLeft };
  };

  const getAverageSleep = () => {
    if (sleepEntries.length === 0) return 0;
    const total = sleepEntries.reduce((sum, entry) => sum + entry.duration, 0);
    return (total / sleepEntries.length).toFixed(1);
  };

  const toggleRoutineItem = (id: number) => {
    setRoutineItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const addNewTask = () => {
    if (newTaskText.trim()) {
      const newTask = {
        id: Date.now(),
        text: newTaskText.trim(),
        completed: false
      };
      setRoutineItems(prev => [...prev, newTask]);
      setNewTaskText("");
      setIsAddingTask(false);
      toast({
        title: "Task added! ✨",
        description: "Your routine is now personalized.",
      });
    }
  };

  const removeTask = (id: number) => {
    setRoutineItems(prev => prev.filter(item => item.id !== id));
  };

  const renderHomeScreen = () => {
    const timeUntil = getTimeUntilBedtime();
    const nearBedtime = isNearBedtime();

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900">
        {/* Animated stars background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <Star 
              key={i}
              className={`absolute text-yellow-200 opacity-20 animate-pulse w-3 h-3`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 p-4">
          <div className="max-w-md mx-auto space-y-6 pt-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="relative">
                <Moon className="w-16 h-16 text-yellow-300 mx-auto animate-pulse" />
                <div className="absolute inset-0 w-16 h-16 mx-auto rounded-full bg-yellow-300/10 animate-ping"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">SleepWise</h1>
                <p className="text-blue-200">Your cozy sleep companion</p>
              </div>
            </div>

            {/* Sleep Quotes - Fixed contrast */}
            <SleepQuotes isNearBedtime={nearBedtime} />

            {/* Time until bedtime - Enhanced contrast */}
            <Card className="bg-white/15 backdrop-blur-md border-white/30">
              <CardContent className="p-6 text-center space-y-4">
                <Clock className="w-8 h-8 text-blue-300 mx-auto" />
                <div>
                  <p className="text-blue-100 text-sm font-medium">Time until bedtime</p>
                  <p className="text-white text-2xl font-bold drop-shadow-lg">
                    {timeUntil.hours}h {timeUntil.minutes}m
                  </p>
                  {nearBedtime && (
                    <Badge className="mt-2 bg-yellow-500/30 text-yellow-100 border-yellow-400/50 font-medium">
                      Bedtime approaching! 🌙
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Sleep stats - Enhanced contrast */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-gradient-to-br from-purple-600/25 to-indigo-600/25 backdrop-blur-md border-white/30">
                <CardContent className="p-4 text-center">
                  <Moon className="w-6 h-6 text-purple-300 mx-auto mb-2" />
                  <p className="text-purple-100 text-xs font-medium">Bedtime Goal</p>
                  <p className="text-white font-bold text-lg drop-shadow-lg">{bedtimeGoal}</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-600/25 to-cyan-600/25 backdrop-blur-md border-white/30">
                <CardContent className="p-4 text-center">
                  <Star className="w-6 h-6 text-blue-300 mx-auto mb-2" />
                  <p className="text-blue-100 text-xs font-medium">Average Sleep</p>
                  <p className="text-white font-bold text-lg drop-shadow-lg">{getAverageSleep()}h</p>
                </CardContent>
              </Card>
            </div>

            {/* Action buttons */}
            <div className="space-y-3">
              <Button 
                onClick={() => setCurrentScreen("calendar")}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white py-4 h-auto"
              >
                <Calendar className="w-5 h-5 mr-2" />
                <div className="text-left">
                  <p className="font-semibold">Sleep Calendar</p>
                  <p className="text-xs opacity-90">Track your sleep journey</p>
                </div>
              </Button>

              <Button 
                onClick={() => setCurrentScreen("log")}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-4 h-auto"
              >
                <Plus className="w-5 h-5 mr-2" />
                <div className="text-left">
                  <p className="font-semibold">Log Sleep</p>
                  <p className="text-xs opacity-90">Record last night's rest</p>
                </div>
              </Button>

              <Button 
                onClick={() => setCurrentScreen("routine")}
                className="w-full bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white py-4 h-auto shadow-lg"
              >
                <Heart className="w-5 h-5 mr-2" />
                <div className="text-left">
                  <p className="font-semibold">Bedtime Routine</p>
                  <p className="text-xs opacity-90">Wind down peacefully</p>
                </div>
              </Button>
            </div>

            {/* Weekly progress */}
            <Card className="bg-white/10 backdrop-blur-md border-white/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-white font-medium">This Week</p>
                  <p className="text-blue-100 text-sm">{sleepEntries.length}/7 nights</p>
                </div>
                <Progress value={(sleepEntries.length / 7) * 100} className="h-2" />
                <p className="text-blue-100 text-xs mt-2">Keep building your sleep habit! ✨</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  };

  const renderLogScreen = () => {
    const [bedtime, setBedtime] = useState("");
    const [wakeTime, setWakeTime] = useState("");
    const [quality, setQuality] = useState(0);

    const calculateDuration = (bedtime: string, wakeTime: string) => {
      if (!bedtime || !wakeTime) return 0;
      
      const bedtimeDate = new Date(`2000-01-01 ${bedtime}`);
      let wakeTimeDate = new Date(`2000-01-01 ${wakeTime}`);
      
      // If wake time is earlier than bedtime, assume it's the next day
      if (wakeTimeDate < bedtimeDate) {
        wakeTimeDate = new Date(`2000-01-02 ${wakeTime}`);
      }
      
      const diff = wakeTimeDate.getTime() - bedtimeDate.getTime();
      return diff / (1000 * 60 * 60); // Convert to hours
    };

    const handleSave = () => {
      const duration = calculateDuration(bedtime, wakeTime);
      const today = new Date().toISOString().split('T')[0];
      
      const newEntry = {
        date: today,
        bedtime,
        wakeTime,
        duration: parseFloat(duration.toFixed(2)),
        quality
      };

      addSleepEntry(newEntry);
      
      toast({
        title: "Sleep logged! 💤",
        description: "Sweet dreams data saved successfully.",
      });
      setCurrentScreen("home");
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-900 p-4">
        <div className="max-w-md mx-auto space-y-6 pt-8">
          <Button 
            variant="ghost" 
            onClick={() => setCurrentScreen("home")}
            className="text-emerald-200 hover:text-white hover:bg-white/10"
          >
            ← Back
          </Button>
          
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-white">Log Your Sleep</h1>
            <p className="text-emerald-200">How did you rest last night?</p>
          </div>

          <Card className="bg-white/15 backdrop-blur-md border-white/30">
            <CardContent className="p-6 space-y-6">
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-white">
                  🛏️ When did you go to bed?
                </label>
                <input 
                  type="time"
                  value={bedtime}
                  onChange={(e) => setBedtime(e.target.value)}
                  className="w-full p-3 bg-white/15 border border-white/30 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-white">
                  ☀️ When did you wake up?
                </label>
                <input 
                  type="time"
                  value={wakeTime}
                  onChange={(e) => setWakeTime(e.target.value)}
                  className="w-full p-3 bg-white/15 border border-white/30 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-white">
                  ⭐ How was your sleep quality? (1-5)
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      onClick={() => setQuality(num)}
                      className={`w-12 h-12 rounded-full border-2 text-white font-semibold transition-all ${
                        quality === num 
                          ? 'border-emerald-400 bg-emerald-400/30' 
                          : 'border-white/30 hover:border-emerald-400 hover:bg-emerald-400/20'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <Button 
                onClick={handleSave}
                disabled={!bedtime || !wakeTime || !quality}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-3 disabled:opacity-50"
              >
                Save Sleep Entry
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderRoutineScreen = () => {
    const completedItems = routineItems.filter(item => item.completed).length;
    const progress = (completedItems / routineItems.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-950 via-purple-950 to-slate-900 p-4">
        <div className="max-w-md mx-auto space-y-6 pt-8">
          <Button 
            variant="ghost" 
            onClick={() => setCurrentScreen("home")}
            className="text-pink-200 hover:text-white hover:bg-white/10"
          >
            ← Back
          </Button>

          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-white">Bedtime Routine</h1>
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-pink-200 text-sm">{completedItems} of {routineItems.length} completed</p>
            </div>
          </div>

          <div className="space-y-3">
            {routineItems.map((item) => (
              <Card 
                key={item.id} 
                className={`transition-all duration-300 ${
                  item.completed 
                    ? 'bg-gradient-to-r from-emerald-500/25 to-teal-500/25 border-emerald-400/40' 
                    : 'bg-white/15 hover:bg-white/20 border-white/30'
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => toggleRoutineItem(item.id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        item.completed 
                          ? 'bg-emerald-500 border-emerald-500' 
                          : 'border-white/50 hover:border-emerald-400'
                      }`}
                    >
                      {item.completed && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </button>
                    <p className={`flex-1 ${
                      item.completed ? 'text-emerald-200 line-through' : 'text-white'
                    }`}>
                      {item.text}
                    </p>
                    {item.id > 4 && (
                      <button
                        onClick={() => removeTask(item.id)}
                        className="text-pink-300 hover:text-white transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Add new task */}
            {isAddingTask ? (
              <Card className="bg-white/15 border-white/30">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={newTaskText}
                      onChange={(e) => setNewTaskText(e.target.value)}
                      placeholder="Add new routine task..."
                      className="flex-1 p-2 bg-white/10 border border-white/30 rounded text-white placeholder-white/50 focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
                      onKeyPress={(e) => e.key === 'Enter' && addNewTask()}
                      autoFocus
                    />
                    <button
                      onClick={addNewTask}
                      className="text-emerald-400 hover:text-emerald-300"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => {
                        setIsAddingTask(false);
                        setNewTaskText("");
                      }}
                      className="text-pink-300 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Button
                onClick={() => setIsAddingTask(true)}
                className="w-full bg-gradient-to-r from-pink-400/20 to-purple-500/20 border border-pink-400/30 text-pink-200 hover:bg-pink-400/30 hover:text-white py-3"
                variant="outline"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Custom Task
              </Button>
            )}
          </div>

          {progress === 100 && (
            <Card className="bg-gradient-to-r from-purple-500/25 to-pink-600/25 border-purple-400/40">
              <CardContent className="p-6 text-center space-y-4">
                <Star className="w-8 h-8 mx-auto text-yellow-300 fill-current" />
                <p className="text-white font-semibold">Perfect! Time for sweet dreams! 🌙</p>
                <Button 
                  onClick={() => setCurrentScreen("home")}
                  className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
                >
                  Return Home
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  };

  const screens = {
    home: renderHomeScreen,
    calendar: () => <SleepCalendar onClose={() => setCurrentScreen("home")} />,
    log: renderLogScreen,
    routine: renderRoutineScreen
  };

  return screens[currentScreen]();
};

export default SleepWise;
