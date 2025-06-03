
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Moon, Coffee, Smartphone, Clock, Star, Heart, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SleepWise = () => {
  const [currentScreen, setCurrentScreen] = useState("welcome");
  const [habitCompleted, setHabitCompleted] = useState(false);
  const [routineItems, setRoutineItems] = useState([
    { id: 1, text: "Turn off all screens", completed: false },
    { id: 2, text: "Stretch for 1 minute", completed: false },
    { id: 3, text: "Write in your sleep journal", completed: false },
    { id: 4, text: "Dim the lights", completed: false }
  ]);
  const [sleepData, setSleepData] = useState({
    bedtime: "",
    relaxation: 3,
    thoughts: ""
  });
  
  const { toast } = useToast();

  const handleHabitComplete = () => {
    setHabitCompleted(true);
    toast({
      title: "Great job! 🌟",
      description: "Tiny habit completed! You're building better sleep one step at a time.",
    });
  };

  const toggleRoutineItem = (id: number) => {
    setRoutineItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const completedRoutineItems = routineItems.filter(item => item.completed).length;
  const routineProgress = (completedRoutineItems / routineItems.length) * 100;

  const renderWelcomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 flex items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-md">
        <div className="relative">
          <Moon className="w-24 h-24 text-yellow-200 mx-auto mb-6 animate-pulse" />
          <div className="absolute inset-0 w-24 h-24 mx-auto rounded-full bg-yellow-200/20 animate-ping"></div>
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-white">Welcome to SleepWise</h1>
          <p className="text-xl text-blue-100">A calmer mind, one tiny habit at a time.</p>
        </div>
        <Button 
          onClick={() => setCurrentScreen("dashboard")}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 text-lg transition-all duration-300 transform hover:scale-105"
        >
          Let's Begin
        </Button>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-md mx-auto space-y-6 pt-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-800">Today's Sleep Progress</h1>
          <div className="flex justify-center">
            <Star className="w-6 h-6 text-yellow-500 fill-current" />
          </div>
        </div>

        <div className="space-y-4">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Moon className="w-6 h-6 text-indigo-600" />
                <div>
                  <p className="font-semibold text-slate-700">Bedtime Goal</p>
                  <p className="text-2xl font-bold text-indigo-600">10:30 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Coffee className="w-6 h-6 text-amber-600" />
                <div>
                  <p className="font-semibold text-slate-700">Caffeine Cutoff</p>
                  <p className="text-2xl font-bold text-amber-600">2:00 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Smartphone className="w-6 h-6 text-red-500" />
                  <div>
                    <p className="font-semibold text-slate-700">Screen-Free Time</p>
                    <p className="text-lg text-red-500">Starts in 30 minutes</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                  Active
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-3 mt-8">
          <Button 
            onClick={() => setCurrentScreen("journal")}
            className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white py-3"
          >
            Log Sleep
          </Button>
          <Button 
            onClick={() => setCurrentScreen("routine")}
            className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white py-3"
          >
            Start Night Routine
          </Button>
          <Button 
            onClick={() => setCurrentScreen("habit")}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3"
          >
            Check Daily Habit
          </Button>
        </div>

        <div className="pt-4">
          <Button 
            variant="outline"
            onClick={() => setCurrentScreen("tips")}
            className="w-full border-slate-300 text-slate-600 hover:bg-slate-50"
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            Tips & Insights
          </Button>
        </div>
      </div>
    </div>
  );

  const renderHabitScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4">
      <div className="max-w-md mx-auto space-y-8 pt-8">
        <Button 
          variant="ghost" 
          onClick={() => setCurrentScreen("dashboard")}
          className="text-slate-600"
        >
          ← Back
        </Button>
        
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-slate-800">Today's Tiny Sleep Habit</h1>
        </div>

        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
          <CardContent className="p-6 text-center space-y-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8 text-white" />
            </div>
            
            <div className="space-y-4">
              <p className="text-lg text-slate-700 leading-relaxed">
                "After brushing your teeth, sit quietly in bed for 2 minutes before using your phone."
              </p>
              
              {habitCompleted ? (
                <div className="space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto" />
                  <p className="text-green-600 font-semibold">Habit completed! Well done! 🎉</p>
                </div>
              ) : (
                <Button 
                  onClick={handleHabitComplete}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3"
                >
                  Mark as Done
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50/50 border-blue-200">
          <CardContent className="p-4">
            <p className="text-sm text-blue-700 text-center">
              <span className="font-semibold">Why this works:</span> Creating a buffer between teeth brushing and phone use helps your brain start winding down naturally.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderRoutineScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50 p-4">
      <div className="max-w-md mx-auto space-y-6 pt-8">
        <Button 
          variant="ghost" 
          onClick={() => setCurrentScreen("dashboard")}
          className="text-slate-600"
        >
          ← Back
        </Button>

        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-slate-800">Wind Down Routine</h1>
          <div className="space-y-2">
            <Progress value={routineProgress} className="h-2" />
            <p className="text-sm text-slate-600">{completedRoutineItems} of {routineItems.length} completed</p>
          </div>
        </div>

        <div className="space-y-3">
          {routineItems.map((item) => (
            <Card 
              key={item.id} 
              className={`cursor-pointer transition-all duration-300 ${
                item.completed 
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' 
                  : 'bg-white/80 hover:bg-white border-slate-200'
              }`}
              onClick={() => toggleRoutineItem(item.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    item.completed 
                      ? 'bg-green-500 border-green-500' 
                      : 'border-slate-300'
                  }`}>
                    {item.completed && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                  <p className={`flex-1 ${
                    item.completed ? 'text-green-700 line-through' : 'text-slate-700'
                  }`}>
                    {item.text}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {routineProgress === 100 && (
          <Card className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
            <CardContent className="p-6 text-center">
              <div className="space-y-4">
                <Star className="w-8 h-8 mx-auto fill-current" />
                <p className="font-semibold">Routine Complete! Sweet dreams! 🌙</p>
                <Button 
                  variant="secondary"
                  onClick={() => setCurrentScreen("dashboard")}
                  className="bg-white text-purple-600 hover:bg-slate-50"
                >
                  Return to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );

  const renderJournalScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-4">
      <div className="max-w-md mx-auto space-y-6 pt-8">
        <Button 
          variant="ghost" 
          onClick={() => setCurrentScreen("dashboard")}
          className="text-slate-600"
        >
          ← Back
        </Button>

        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-800">How was your day?</h1>
        </div>

        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-slate-700">
                💤 What time did you go to bed?
              </label>
              <input 
                type="time"
                value={sleepData.bedtime}
                onChange={(e) => setSleepData(prev => ({ ...prev, bedtime: e.target.value }))}
                className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-semibold text-slate-700">
                😌 How relaxed did you feel? (1–5 scale)
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    onClick={() => setSleepData(prev => ({ ...prev, relaxation: num }))}
                    className={`w-12 h-12 rounded-full border-2 font-semibold transition-all ${
                      sleepData.relaxation === num
                        ? 'bg-amber-500 border-amber-500 text-white'
                        : 'border-amber-200 text-amber-600 hover:border-amber-400'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-semibold text-slate-700">
                📝 Any thoughts before sleep?
              </label>
              <textarea 
                value={sleepData.thoughts}
                onChange={(e) => setSleepData(prev => ({ ...prev, thoughts: e.target.value }))}
                placeholder="What's on your mind..."
                className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 h-24 resize-none"
              />
            </div>

            <Button 
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white py-3"
              onClick={() => {
                toast({
                  title: "Sleep entry saved! 💤",
                  description: "Your reflection helps build better sleep habits.",
                });
                setCurrentScreen("dashboard");
              }}
            >
              Save Entry
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderTipsScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50 p-4">
      <div className="max-w-md mx-auto space-y-6 pt-8">
        <Button 
          variant="ghost" 
          onClick={() => setCurrentScreen("dashboard")}
          className="text-slate-600"
        >
          ← Back
        </Button>

        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-800">Better Sleep Starts Small</h1>
        </div>

        <div className="space-y-4">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-5">
              <div className="flex items-start space-x-3">
                <Coffee className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Caffeine Timing</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Caffeine stays in your system for 6–8 hours. Cut it off early to avoid sleep disruption!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-5">
              <div className="flex items-start space-x-3">
                <Smartphone className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Blue Light Impact</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Blue light delays melatonin production and keeps your brain alert when it should be winding down.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-5">
              <div className="flex items-start space-x-3">
                <Moon className="w-6 h-6 text-indigo-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Sleep Benefits</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    One good night improves focus, memory, and mood. Quality sleep is your superpower!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
            <CardContent className="p-5">
              <div className="text-center space-y-3">
                <h3 className="font-semibold text-lg">About SleepWise</h3>
                <p className="text-sm leading-relaxed text-green-50">
                  SleepWise is built using BJ Fogg's Tiny Habits method. It helps you sleep better through small, science-based changes you can actually stick with.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  const screens = {
    welcome: renderWelcomeScreen,
    dashboard: renderDashboard,
    habit: renderHabitScreen,
    routine: renderRoutineScreen,
    journal: renderJournalScreen,
    tips: renderTipsScreen
  };

  return screens[currentScreen]();
};

export default SleepWise;
