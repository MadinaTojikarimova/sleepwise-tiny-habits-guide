
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Moon, Star } from 'lucide-react';

const sleepQuotes = [
  "Sleep is the golden chain that ties health and our bodies together. ✨",
  "A good laugh and a long sleep are the best cures in the doctor's book. 🌙",
  "Sleep is the best meditation. Let your mind rest. 💫",
  "Early to bed and early to rise, makes a person healthy, wealthy and wise. 🌟",
  "Sleep is the cousin of death, but also the nursemaid of life. 🌙",
  "The best bridge between despair and hope is a good night's sleep. ✨",
  "Sleep is not a luxury, it's a necessity for your well-being. 💤",
  "Dreams are the windows to your soul. Sleep well tonight. 🌟"
];

const persuasiveMessages = [
  "Your body is calling for rest. Listen to it. 🌙",
  "Every minute of sleep now is an investment in tomorrow's energy. ✨",
  "Your mind has worked hard today. Give it the rest it deserves. 💫",
  "Quality sleep is your secret weapon for a better tomorrow. 🌟",
  "Your future self will thank you for sleeping well tonight. 🌙",
  "Sleep is not time lost, it's time invested in your health. ✨",
  "Your dreams are waiting for you. Time to rest. 💤"
];

interface SleepQuotesProps {
  isNearBedtime?: boolean;
}

const SleepQuotes = ({ isNearBedtime = false }: SleepQuotesProps) => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const quotes = isNearBedtime ? persuasiveMessages : sleepQuotes;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <Card className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 backdrop-blur-md border-white/20">
      <CardContent className="p-6 text-center space-y-4">
        <div className="flex justify-center space-x-3">
          <Moon className="w-6 h-6 text-yellow-300 animate-pulse" />
          <Star className="w-5 h-5 text-yellow-200" />
          <Star className="w-4 h-4 text-yellow-100" />
        </div>
        
        <p className="text-white text-lg leading-relaxed font-light italic">
          "{quotes[currentQuote]}"
        </p>
        
        <div className="flex justify-center space-x-1">
          {quotes.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentQuote 
                  ? 'bg-yellow-300' 
                  : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SleepQuotes;
