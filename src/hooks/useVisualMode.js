import { useState } from 'react';

function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  /**
   * Conditionally updates the state (mode and history) for an Appointment
   * component.
   * @param {string} newMode - the next visual state (aka mode) of an
   * Appointment component
   * @param {boolean} replace - indicates whether to replace the most
   * recent mode with the provided new mode
   */
  function transition(newMode, replace = false) {
    if (replace) {
      setHistory(prev => [...prev.slice(0, -1), newMode]);
    } else {
      setHistory(prev => [...prev, newMode]);
    }
    setMode(newMode);
  }

  /**
   * Removes current mode from history and sets mode to previous value.
   * An event handler used when user wants to move back in an Appointment
   * component.
   */
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
};

export default useVisualMode;