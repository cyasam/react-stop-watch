import { useState, createContext, useMemo, useCallback } from 'react';
import { useWatchInterval } from './utils';

import styles from './Watch.module.css';

export const StopWatchContext = createContext();

function Watch({ children }) {
  const [started, setStarted] = useState(null);
  const { duration, setDuration } = useWatchInterval(started);

  const start = useCallback(() => {
    !started && setStarted(true);
  }, [started]);

  const stop = useCallback(() => {
    started && setStarted(false);
  }, [started]);

  const reset = useCallback(() => {
    setStarted(null);
    setDuration(0);
  }, [setDuration]);

  const value = useMemo(
    () => ({ duration, start, stop, reset }),
    [duration, start, stop, reset]
  );

  return (
    <StopWatchContext.Provider value={value}>
      <div className={styles.stopwatch}>{children}</div>
    </StopWatchContext.Provider>
  );
}

export default Watch;
