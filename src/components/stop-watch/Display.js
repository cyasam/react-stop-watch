import { useContext } from 'react';
import { StopWatchContext } from './Watch';

import styles from './Display.module.css';

function Display() {
  const context = useContext(StopWatchContext);

  if (!context) {
    return (
      <div>Display component cannot be used outside the Menu component.</div>
    );
  }

  const time = (context.duration / 1000).toFixed(2).split('.');
  const miliseconds = time[1];

  const hours = Math.floor(time[0] / 3600);
  const minutes = Math.floor(time[0] / 60) - hours * 60;
  const seconds = time[0] - minutes * 60 - hours * 3600;

  const hoursLabel = hours < 10 ? `0${hours}` : hours;
  const minutesLabel = minutes < 10 ? `0${minutes}` : minutes;
  const secondsLabel = seconds < 10 ? `0${seconds}` : seconds;
  const milisecondsLabel = miliseconds;

  return (
    <div className={styles['duration-label']}>
      <div className="hours">{hoursLabel}</div>
      <div>:</div>
      <div className="minutes">{minutesLabel}</div>
      <div>:</div>
      <div className="seconds">{secondsLabel}</div>
      <div>.</div>
      <div className="miliseconds">{milisecondsLabel}</div>
    </div>
  );
}

export default Display;
