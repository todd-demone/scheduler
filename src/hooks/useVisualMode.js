import { useState } from 'react';

/**
 * sets Appointment's current mode (e.g., empty); keeps mode history
 * @param {String} initial
 * @returns Object containing 3 items: mode (String), transition (Function), back (Function)
 */
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) {
      setHistory(prev => [...prev.slice(0, -1), newMode])
    } else {
      setHistory(prev => [...prev, newMode]);
    }
    setMode(newMode);
  }

  function back() {
    if (history.length > 1) {
      setHistory(prev => {
        const newHistory = prev.slice(0, -1);
        setMode(newHistory[newHistory.length - 1]);
        return newHistory;
      });
    }
  }

  return { mode, transition, back };
}