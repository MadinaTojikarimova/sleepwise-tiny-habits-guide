
import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Moon, Star, Clock } from 'lucide-react';
import { useSleepData, SleepEntry } from '@/hooks/useSleepData';
import { format, parseISO } from 'date-fns';

interface SleepCalendarProps {
  onClose: () => void;
}

const SleepCalendar = ({ onClose }: SleepCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const { getSleepEntry } = useSleepData();

  const selectedEntry = selectedDate ? getSleepEntry(format(selectedDate, 'yyyy-MM-dd')) : null;

  const getDayContent = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const entry = getSleepEntry(dateStr);
    
    if (!entry) return null;
    
    const getDurationColor = (duration: number) => {
      if (duration >= 8) return 'bg-green-400';
      if (duration >= 7) return 'bg-yellow-400';
      return 'bg-red-400';
    };

    return (
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
        <div className={`w-2 h-2 rounded-full ${getDurationColor(entry.duration)}`} />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900 p-4">
      <div className="max-w-md mx-auto space-y-6 pt-8">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={onClose}
            className="text-blue-200 hover:text-white hover:bg-white/10"
          >
            ← Back
          </Button>
          <div className="flex items-center space-x-2">
            <Moon className="w-5 h-5 text-yellow-300" />
            <Star className="w-4 h-4 text-yellow-200" />
          </div>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-white">Sleep Calendar</h1>
          <p className="text-blue-200 text-sm">Track your nightly rest</p>
        </div>

        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="w-full text-white [&_.rdp-day]:text-white [&_.rdp-day_button]:hover:bg-white/20"
              modifiers={{
                hasSleep: (date) => !!getSleepEntry(format(date, 'yyyy-MM-dd'))
              }}
              modifiersStyles={{
                hasSleep: { position: 'relative' }
              }}
              components={{
                Day: ({ date, ...props }) => (
                  <div className="relative">
                    <button {...props} className="relative w-full h-full">
                      {date.getDate()}
                      {getDayContent(date)}
                    </button>
                  </div>
                )
              }}
            />
          </CardContent>
        </Card>

        {selectedEntry && (
          <Card className="bg-gradient-to-r from-purple-600/20 to-indigo-600/20 backdrop-blur-md border-white/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>{format(parseISO(selectedEntry.date), 'MMMM d, yyyy')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-blue-200 text-sm">Bedtime</p>
                  <p className="text-white font-semibold text-lg">{selectedEntry.bedtime}</p>
                </div>
                <div className="text-center">
                  <p className="text-blue-200 text-sm">Wake Time</p>
                  <p className="text-white font-semibold text-lg">{selectedEntry.wakeTime}</p>
                </div>
              </div>
              
              <div className="text-center space-y-2">
                <p className="text-blue-200 text-sm">Sleep Duration</p>
                <p className="text-white font-bold text-2xl">{selectedEntry.duration}h</p>
                
                <div className="flex justify-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star}
                      className={`w-4 h-4 ${
                        star <= selectedEntry.quality 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-400'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-blue-200 text-xs">Sleep Quality</p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="text-center">
          <p className="text-blue-200 text-sm">
            Tap on a day to see your sleep details
          </p>
        </div>
      </div>
    </div>
  );
};

export default SleepCalendar;
