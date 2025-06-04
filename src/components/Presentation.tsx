
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Moon, Heart, Lightbulb, Target, Zap, Users, Brain, CheckCircle2, Star, Clock, Smartphone, Coffee } from "lucide-react";

const Presentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    // Title Slide
    {
      title: "SleepWise: Applying BJ Fogg's Tiny Habits to Sleep Behavior",
      content: (
        <div className="text-center space-y-8">
          <Moon className="w-24 h-24 text-blue-500 mx-auto animate-pulse" />
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-700">A Psychology-Based Sleep Improvement App</h2>
            <p className="text-lg text-gray-600">Connecting Class Concepts to Real-World Application</p>
            <p className="text-base text-gray-500">Final Project Presentation</p>
          </div>
        </div>
      )
    },
    
    // Topic Selection
    {
      title: "Class Topics Applied",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6 text-center">
                <Heart className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-blue-800">Tiny Habits Method</h3>
                <p className="text-sm text-blue-600 mt-2">BJ Fogg's behavior change framework</p>
              </CardContent>
            </Card>
            
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-6 text-center">
                <Moon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-purple-800">Sleep & Behavior</h3>
                <p className="text-sm text-purple-600 mt-2">Psychological factors in sleep hygiene</p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6 text-center">
              <Lightbulb className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-green-800">Human Factors & UX Design</h3>
              <p className="text-sm text-green-600 mt-2">Applying psychological principles to user interface design</p>
            </CardContent>
          </Card>
        </div>
      )
    },
    
    // Problem Statement
    {
      title: "The Sleep Crisis Problem",
      content: (
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <div className="bg-red-100 border border-red-300 rounded-lg p-6">
              <h3 className="text-xl font-bold text-red-800 mb-4">Current Statistics</h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-3xl font-bold text-red-700">35%</p>
                  <p className="text-sm text-red-600">of adults get insufficient sleep</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-red-700">70%</p>
                  <p className="text-sm text-red-600">report sleep quality issues</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Why Traditional Sleep Apps Fail:</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center"><span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>Focus on tracking, not behavior change</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>Overwhelming users with too many changes</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>Lack psychological foundation</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>No consideration for habit formation science</li>
            </ul>
          </div>
        </div>
      )
    },
    
    // BJ Fogg Method Theory
    {
      title: "BJ Fogg's Tiny Habits Framework",
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-blue-800 mb-4 text-center">B = MAP</h3>
            <p className="text-center text-blue-600 mb-6">Behavior = Motivation × Ability × Prompt</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4 text-center">
                <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-semibold text-green-800">Motivation</h4>
                <p className="text-xs text-green-600 mt-1">Desire to do the behavior</p>
              </CardContent>
            </Card>
            
            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="p-4 text-center">
                <Zap className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <h4 className="font-semibold text-orange-800">Ability</h4>
                <p className="text-xs text-orange-600 mt-1">Capacity to do the behavior</p>
              </CardContent>
            </Card>
            
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4 text-center">
                <Brain className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h4 className="font-semibold text-purple-800">Prompt</h4>
                <p className="text-xs text-purple-600 mt-1">Trigger for the behavior</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800"><strong>Key Insight:</strong> Start tiny, celebrate immediately, and let habits grow naturally</p>
          </div>
        </div>
      )
    },
    
    // Solution Overview
    {
      title: "SleepWise: Psychology-Based Solution",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">How SleepWise Applies Class Concepts</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <Heart className="w-8 h-8 text-blue-600 mb-3" />
                <h4 className="font-semibold text-blue-800 mb-2">Tiny Habits Implementation</h4>
                <ul className="text-xs text-blue-600 space-y-1">
                  <li>• 2-minute micro-behaviors</li>
                  <li>• Specific prompts (after brushing teeth)</li>
                  <li>• Immediate celebration feedback</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <Lightbulb className="w-8 h-8 text-green-600 mb-3" />
                <h4 className="font-semibold text-green-800 mb-2">Human Factors Design</h4>
                <ul className="text-xs text-green-600 space-y-1">
                  <li>• Cognitive load reduction</li>
                  <li>• Progressive disclosure</li>
                  <li>• Visual feedback systems</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-4 text-center">
              <Moon className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h4 className="font-semibold text-purple-800 mb-2">Sleep Behavior Psychology</h4>
              <p className="text-xs text-purple-600">Addresses cognitive patterns, environmental cues, and behavioral chains that impact sleep quality</p>
            </CardContent>
          </Card>
        </div>
      )
    },
    
    // App Features Demo
    {
      title: "Key Features & Psychology Integration",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center mb-3">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 mr-2" />
                  <h4 className="font-semibold text-blue-800">Daily Tiny Habit</h4>
                </div>
                <p className="text-xs text-gray-600 mb-2">"After brushing teeth, sit quietly for 2 minutes"</p>
                <div className="bg-blue-50 p-2 rounded text-xs text-blue-700">
                  <strong>Psychology:</strong> Anchoring to existing routine, minimal cognitive load
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center mb-3">
                  <Star className="w-6 h-6 text-green-600 mr-2" />
                  <h4 className="font-semibold text-green-800">Immediate Celebration</h4>
                </div>
                <p className="text-xs text-gray-600 mb-2">Instant positive feedback with emojis & messages</p>
                <div className="bg-green-50 p-2 rounded text-xs text-green-700">
                  <strong>Psychology:</strong> Dopamine release, positive reinforcement
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Card className="border-red-200">
              <CardContent className="p-3">
                <Smartphone className="w-5 h-5 text-red-600 mb-2" />
                <h5 className="text-sm font-semibold text-red-800">Screen Time Alerts</h5>
                <p className="text-xs text-red-600">Blue light awareness</p>
              </CardContent>
            </Card>
            
            <Card className="border-amber-200">
              <CardContent className="p-3">
                <Coffee className="w-5 h-5 text-amber-600 mb-2" />
                <h5 className="text-sm font-semibold text-amber-800">Caffeine Timing</h5>
                <p className="text-xs text-amber-600">Circadian rhythm protection</p>
              </CardContent>
            </Card>
            
            <Card className="border-purple-200">
              <CardContent className="p-3">
                <Clock className="w-5 h-5 text-purple-600 mb-2" />
                <h5 className="text-sm font-semibold text-purple-800">Wind-Down Routine</h5>
                <p className="text-xs text-purple-600">Progressive relaxation</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    
    // Real-World Application
    {
      title: "Real-World Application & Impact",
      content: (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-800 text-center">Connecting Psychology Theory to Practice</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-md font-semibold text-blue-800">Theoretical Foundation</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></span>
                  <span><strong>Habit Loop Theory:</strong> Cue → Routine → Reward</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></span>
                  <span><strong>Cognitive Load Theory:</strong> Minimize mental effort</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></span>
                  <span><strong>Self-Efficacy:</strong> Build confidence through small wins</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-md font-semibold text-green-800">Practical Implementation</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></span>
                  <span><strong>Target Users:</strong> College students, professionals with sleep issues</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></span>
                  <span><strong>Scalability:</strong> Applicable to other behavior changes</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></span>
                  <span><strong>Measurable Outcomes:</strong> Habit completion rates, sleep quality</span>
                </li>
              </ul>
            </div>
          </div>
          
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">Innovation Factor</h4>
              <p className="text-sm text-yellow-700">First sleep app to specifically implement BJ Fogg's Tiny Habits methodology with focus on psychological principles rather than just tracking</p>
            </CardContent>
          </Card>
        </div>
      )
    },
    
    // What I Learned
    {
      title: "Key Insights & Learning Outcomes",
      content: (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-800 text-center">What This Project Taught Me</h3>
          
          <div className="space-y-4">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-blue-800 mb-2">1. Theory-Practice Connection</h4>
                <p className="text-sm text-blue-600">Understanding how academic psychological concepts directly translate into user experience design and behavior change interventions</p>
              </CardContent>
            </Card>
            
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-green-800 mb-2">2. Importance of Starting Small</h4>
                <p className="text-sm text-green-600">BJ Fogg's emphasis on tiny habits revealed how traditional "go big or go home" approaches often fail in behavior change</p>
              </CardContent>
            </Card>
            
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-purple-800 mb-2">3. Human-Centered Design Principles</h4>
                <p className="text-sm text-purple-600">How cognitive psychology informs interface design - reducing mental load while maintaining engagement</p>
              </CardContent>
            </Card>
            
            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-orange-800 mb-2">4. Interdisciplinary Approach Value</h4>
                <p className="text-sm text-orange-600">Combining psychology, technology, and health science creates more effective solutions than any single approach</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    
    // Future Applications
    {
      title: "Future Applications & Extensions",
      content: (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-800 text-center">Beyond Sleep: Scaling the Concept</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <Users className="w-8 h-8 text-blue-600 mb-3" />
                <h4 className="font-semibold text-blue-800 mb-2">Healthcare Applications</h4>
                <ul className="text-xs text-blue-600 space-y-1">
                  <li>• Medication adherence</li>
                  <li>• Physical therapy routines</li>
                  <li>• Mental health check-ins</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <Brain className="w-8 h-8 text-green-600 mb-3" />
                <h4 className="font-semibold text-green-800 mb-2">Educational Settings</h4>
                <ul className="text-xs text-green-600 space-y-1">
                  <li>• Study habit formation</li>
                  <li>• Classroom behavior management</li>
                  <li>• Skill building programs</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-4 text-center">
              <Lightbulb className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h4 className="font-semibold text-purple-800 mb-2">Research Opportunities</h4>
              <p className="text-xs text-purple-600">This project could serve as a foundation for studying digital behavior change interventions and measuring the effectiveness of psychology-based app design</p>
            </CardContent>
          </Card>
        </div>
      )
    },
    
    // Conclusion
    {
      title: "Conclusion: Psychology in Action",
      content: (
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">Key Takeaways</h2>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6 space-y-4">
              <div className="flex justify-center space-x-4">
                <Heart className="w-8 h-8 text-red-500" />
                <Brain className="w-8 h-8 text-purple-500" />
                <Lightbulb className="w-8 h-8 text-yellow-500" />
              </div>
              
              <div className="space-y-3 text-sm text-gray-700">
                <p><strong>Psychology theory</strong> provides the foundation for effective behavior change</p>
                <p><strong>Small changes</strong> compound into significant life improvements</p>
                <p><strong>Technology</strong> can amplify psychological principles when thoughtfully applied</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <p className="text-lg text-gray-600">SleepWise demonstrates how class concepts</p>
            <p className="text-lg text-gray-600">can create real-world solutions</p>
            <div className="pt-4">
              <Moon className="w-16 h-16 text-blue-500 mx-auto" />
              <p className="text-sm text-gray-500 mt-2">Thank you for your attention!</p>
            </div>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg mb-6 p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Psychology Final Project Presentation</h1>
            <div className="text-sm text-gray-600">
              Slide {currentSlide + 1} of {slides.length}
            </div>
          </div>
        </div>

        {/* Slide Content */}
        <div className="bg-white rounded-lg shadow-xl min-h-[500px] p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center border-b pb-4">
            {slides[currentSlide].title}
          </h1>
          <div className="h-full">
            {slides[currentSlide].content}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center bg-white rounded-lg shadow-lg p-4">
          <Button 
            onClick={prevSlide} 
            disabled={currentSlide === 0}
            variant="outline"
            className="flex items-center"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide 
                    ? 'bg-blue-600' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          <Button 
            onClick={nextSlide} 
            disabled={currentSlide === slides.length - 1}
            variant="outline"
            className="flex items-center"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Presentation;
