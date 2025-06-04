
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Moon, Star, Clock, Calendar, Heart, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SleepQuotes from "@/components/SleepQuotes";
import SleepCalendar from "@/components/SleepCalendar";
import { useSleepData } from "@/hooks/useSleepData";

const SleepWise = () => {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [bedtimeGoal] = useState("22:30");
  const { sleepEntries } = useSleepData();
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

            {/* Sleep Quotes */}
            <SleepQuotes isNearBedtime={nearBedtime} />

            {/* Time until bedtime */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-6 text-center space-y-4">
                <Clock className="w-8 h-8 text-blue-300 mx-auto" />
                <div>
                  <p className="text-blue-200 text-sm">Time until bedtime</p>
                  <p className="text-white text-2xl font-bold">
                    {timeUntil.hours}h {timeUntil.minutes}m
                  </p>
                  {nearBedtime && (
                    <Badge className="mt-2 bg-yellow-500/20 text-yellow-200 border-yellow-400/30">
                      Bedtime approaching! 🌙
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Sleep stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-gradient-to-br from-purple-600/20 to-indigo-600/20 backdrop-blur-md border-white/20">
                <CardContent className="p-4 text-center">
                  <Moon className="w-6 h-6 text-purple-300 mx-auto mb-2" />
                  <p className="text-purple-200 text-xs">Bedtime Goal</p>
                  <p className="text-white font-bold text-lg">{bedtimeGoal}</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-md border-white/20">
                <CardContent className="p-4 text-center">
                  <Star className="w-6 h-6 text-blue-300 mx-auto mb-2" />
                  <p className="text-blue-200 text-xs">Average Sleep</p>
                  <p className="text-white font-bold text-lg">{getAverageSleep()}h</p>
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
                className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white py-4 h-auto"
              >
                <Heart className="w-5 h-5 mr-2" />
                <div className="text-left">
                  <p className="font-semibold">Bedtime Routine</p>
                  <p className="text-xs opacity-90">Wind down peacefully</p>
                </div>
              </Button>
            </div>

            {/* Weekly progress */}
            <Card className="bg-white/5 backdrop-blur-md border-white/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-white font-medium">This Week</p>
                  <p className="text-blue-200 text-sm">{sleepEntries.length}/7 nights</p>
                </div>
                <Progress value={(sleepEntries.length / 7) * 100} className="h-2" />
                <p className="text-blue-200 text-xs mt-2">Keep building your sleep habit! ✨</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  };

  const renderLogScreen = () => (
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

        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-white">
                🛏️ When did you go to bed?
              </label>
              <input 
                type="time"
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-semibold text-white">
                ☀️ When did you wake up?
              </label>
              <input 
                type="time"
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
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
                    className="w-12 h-12 rounded-full border-2 border-white/30 text-white font-semibold hover:border-emerald-400 hover:bg-emerald-400/20 transition-all"
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <Button 
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-3"
              onClick={() => {
                toast({
                  title: "Sleep logged! 💤",
                  description: "Sweet dreams data saved successfully.",
                });
                setCurrentScreen("home");
              }}
            >
              Save Sleep Entry
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderRoutineScreen = () => {
    const [routineItems, setRoutineItems] = useState([
      { id: 1, text: "Turn off all screens", completed: false },
      { id: 2, text: "Dim the lights", completed: false },
      { id: 3, text: "Take deep breaths", completed: false },
      { id: 4, text: "Write in gratitude journal", completed: false }
    ]);

    const toggleRoutineItem = (id: number) => {
      setRoutineItems(prev => 
        prev.map(item => 
          item.id === id ? { ...item, completed: !item.completed } : item
        )
      );
    };

    const completedItems = routineItems.filter(item => item.completed).length;
    const progress = (completedItems / routineItems.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-950 via-pink-950 to-slate-900 p-4">
        <div className="max-w-md mx-auto space-y-6 pt-8">
          <Button 
            variant="ghost" 
            onClick={() => setCurrentScreen("home")}
            className="text-rose-200 hover:text-white hover:bg-white/10"
          >
            ← Back
          </Button>

          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-white">Bedtime Routine</h1>
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-rose-200 text-sm">{completedItems} of {routineItems.length} completed</p>
            </div>
          </div>

          <div className="space-y-3">
            {routineItems.map((item) => (
              <Card 
                key={item.id} 
                className={`cursor-pointer transition-all duration-300 ${
                  item.completed 
                    ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-emerald-400/30' 
                    : 'bg-white/10 hover:bg-white/20 border-white/20'
                }`}
                onClick={() => toggleRoutineItem(item.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      item.completed 
                        ? 'bg-emerald-500 border-emerald-500' 
                        : 'border-white/50'
                    }`}>
                      {item.completed && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </div>
                    <p className={`flex-1 ${
                      item.completed ? 'text-emerald-200 line-through' : 'text-white'
                    }`}>
                      {item.text}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {progress === 100 && (
            <Card className="bg-gradient-to-r from-purple-500/20 to-indigo-600/20 border-purple-400/30">
              <CardContent className="p-6 text-center space-y-4">
                <Star className="w-8 h-8 mx-auto text-yellow-300 fill-current" />
                <p className="text-white font-semibold">Perfect! Time for sweet dreams! 🌙</p>
                <Button 
                  onClick={() => setCurrentScreen("home")}
                  className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white"
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
