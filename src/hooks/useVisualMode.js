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
    setMode(newMode);
    if (!replace) {
      setHistory([...history, newMode]);
    }
  }

  function back() {
    if (history.length > 1) {
      setHistory((prevState) => {
        const historyBackOne = prevState.filter((_element, index) => index !== prevState.length - 1);
        setMode(historyBackOne[historyBackOne.length - 1]);
        return historyBackOne;
      })
    }
    // if (history.length > 1) {
    //   history.pop();
    //   setHistory(history);
    //   setMode(history[history.length - 1]);
    // }
  }

  return { mode, transition, back };
}