import { useState, useEffect, useRef, useCallback } from 'react';

export const getInitialTime = () => new Date().getTime();

export const useStartTime = (started) => {
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    if (started && !startTime) {
      setStartTime(getInitialTime());
    }
  }, [startTime, started]);

  useEffect(() => {
    if (started === null) {
      setStartTime(null);
    }
  }, [started]);

  return {
    startTime,
  };
};

export const useStoppedDuration = (started) => {
  const [stoppedDuration, setStoppedDuration] = useState(0);
  const [stoppedTime, setStoppedTime] = useState(null);

  useEffect(() => {
    if (started && stoppedTime) {
      setStoppedDuration(stoppedDuration + getInitialTime() - stoppedTime);
      setStoppedTime(null);
    }

    if (started === false && !stoppedTime) {
      setStoppedTime(getInitialTime());
    }
  }, [started, stoppedTime, stoppedDuration]);

  useEffect(() => {
    if (started === null) {
      setStoppedDuration(0);
      setStoppedTime(null);
    }
  }, [started]);

  return {
    stoppedDuration,
  };
};

export const useWatchInterval = (started) => {
  let interval = useRef();

  const [duration, setDuration] = useState(0);
  const { startTime } = useStartTime(started);
  const { stoppedDuration } = useStoppedDuration(started);

  const clearWatchInterval = useCallback(() => {
    clearInterval(interval.current);
    interval.current = null;
  }, []);

  useEffect(() => {
    if (started) {
      interval.current = setInterval(() => {
        let endTime = getInitialTime();

        const duration = endTime - startTime - stoppedDuration;
        setDuration(duration);
      }, 10);
    }

    return () => clearWatchInterval();
  }, [started, startTime, stoppedDuration, clearWatchInterval]);

  return {
    duration,
    setDuration,
  };
};
