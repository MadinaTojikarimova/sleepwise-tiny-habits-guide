
import { useState } from 'react';

export interface SleepEntry {
  date: string;
  bedtime: string;
  wakeTime: string;
  duration: number;
  quality: number;
}

export const useSleepData = () => {
  const [sleepEntries, setSleepEntries] = useState<SleepEntry[]>([
    {
      date: '2025-06-01',
      bedtime: '22:30',
      wakeTime: '07:00',
      duration: 8.5,
      quality: 4
    },
    {
      date: '2025-06-02',
      bedtime: '23:15',
      wakeTime: '07:30',
      duration: 8.25,
      quality: 3
    },
    {
      date: '2025-06-03',
      bedtime: '22:00',
      wakeTime: '06:45',
      duration: 8.75,
      quality: 5
    }
  ]);

  const addSleepEntry = (entry: SleepEntry) => {
    setSleepEntries(prev => [...prev.filter(e => e.date !== entry.date), entry]);
  };

  const getSleepEntry = (date: string) => {
    return sleepEntries.find(entry => entry.date === date);
  };

  return {
    sleepEntries,
    addSleepEntry,
    getSleepEntry
  };
};
