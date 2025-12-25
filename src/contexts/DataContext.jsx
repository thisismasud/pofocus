import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [sessions, setSessions] = useLocalStorage('pofocus-sessions', []);
  const [distractions, setDistractions] = useLocalStorage('pofocus-distractions', []);

  const addSession = (duration, type = 'focus') => {
    const newSession = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      duration,
      type,
    };
    setSessions((prev) => [...prev, newSession]);
  };

  const addDistraction = (note, durationMinutes = 0) => {
    const newDistraction = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      note,
      duration: durationMinutes * 60, // Store in seconds
    };
    setDistractions((prev) => [...prev, newDistraction]);
  };

  const clearDayData = (dateString) => {
    // dateString should be YYYY-MM-DD
    const dayStart = new Date(dateString).setHours(0, 0, 0, 0);
    const dayEnd = new Date(dateString).setHours(23, 59, 59, 999);

    // Filter out sessions and distractions for this day
    setSessions((prev) => prev.filter((s) => {
      const sDate = new Date(s.date).getTime();
      return sDate < dayStart || sDate > dayEnd;
    }));

    setDistractions((prev) => prev.filter((d) => {
      const dDate = new Date(d.date).getTime();
      return dDate < dayStart || dDate > dayEnd;
    }));
  };

  const getDailyStats = (dateString) => {
    // dateString should be YYYY-MM-DD
    const dayStart = new Date(dateString).setHours(0, 0, 0, 0);
    const dayEnd = new Date(dateString).setHours(23, 59, 59, 999);

    const daySessions = sessions.filter((s) => {
      const sDate = new Date(s.date).getTime();
      return sDate >= dayStart && sDate <= dayEnd;
    });

    const dayDistractions = distractions.filter((d) => {
      const dDate = new Date(d.date).getTime();
      return dDate >= dayStart && dDate <= dayEnd;
    });

    const totalFocusTime = daySessions.reduce((acc, curr) => acc + curr.duration, 0);
    const totalDistractionTime = dayDistractions.reduce((acc, curr) => acc + (curr.duration || 0), 0);

    // Calculate 24-hour breakdown
    const totalDaySeconds = 24 * 60 * 60; // 86400 seconds
    const accountedTime = totalFocusTime + totalDistractionTime;
    const idleTime = totalDaySeconds - accountedTime;

    return {
      sessionsCount: daySessions.length,
      totalFocusTime,
      totalDistractionTime,
      distractionsCount: dayDistractions.length,
      sessions: daySessions,
      distractions: dayDistractions,
      // 24-hour breakdown
      focusHours: totalFocusTime / 3600,
      distractionHours: totalDistractionTime / 3600,
      idleHours: Math.max(0, idleTime / 3600),
    };
  };

  return (
    <DataContext.Provider value={{
      sessions,
      distractions,
      addSession,
      addDistraction,
      getDailyStats,
      clearDayData
    }}>
      {children}
    </DataContext.Provider>
  );
};
