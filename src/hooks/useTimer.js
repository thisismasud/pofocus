import { useCallback, useEffect, useRef, useState } from 'react';
import { useData } from '../contexts/DataContext';
import { DEFAULT_DURATIONS, TIMER_MODES } from '../utils/constants';
import { playNotificationSound } from '../utils/sounds';

const useTimer = () => {
  const [mode, setMode] = useState(TIMER_MODES.FOCUS);
  const [timeLeft, setTimeLeft] = useState(DEFAULT_DURATIONS[TIMER_MODES.FOCUS]);
  const [isActive, setIsActive] = useState(false);
  const [durations, setDurations] = useState(DEFAULT_DURATIONS);
  
  const { addSession } = useData();
  
  const endTimeRef = useRef(null);
  const rafRef = useRef(null);

  const switchMode = useCallback((newMode) => {
    setMode(newMode);
    setTimeLeft(durations[newMode]);
    setIsActive(false);
  }, [durations]);

  const toggleTimer = () => {
    if (!isActive) {
      // Starting
      const now = Date.now();
      endTimeRef.current = now + timeLeft * 1000;
      setIsActive(true);
    } else {
      // Pausing
      setIsActive(false);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(durations[mode]);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  };

  const updateDurations = (newDurations) => {
    setDurations(newDurations);
    if (!isActive) {
      setTimeLeft(newDurations[mode]);
    }
  };

  useEffect(() => {
    if (!isActive) return;

    const tick = () => {
      const now = Date.now();
      const remaining = Math.ceil((endTimeRef.current - now) / 1000);

      if (remaining <= 0) {
        setTimeLeft(0);
        setIsActive(false);
        
        // Play sound for ALL modes when finished
        playNotificationSound();
        
        if (mode === TIMER_MODES.FOCUS) {
          addSession(durations[mode], mode);
        }
        
        // Optional: Auto-switch logic could go here
      } else {
        setTimeLeft(remaining);
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isActive, mode, durations, addSession]);

  // Update timeLeft if durations change while not active
  useEffect(() => {
    if (!isActive) {
      setTimeLeft(durations[mode]);
    }
  }, [durations, mode, isActive]);

  const progress = 1 - timeLeft / durations[mode];

  return {
    timeLeft,
    isActive,
    mode,
    durations,
    progress,
    toggleTimer,
    resetTimer,
    switchMode,
    updateDurations,
  };
};

export default useTimer;
