import { useContext } from 'react';
import { StopWatchContext } from './Watch';

import styles from './Buttons.module.css';

function Buttons() {
  const context = useContext(StopWatchContext);

  if (!context) {
    throw new Error(
      'Buttons component cannot be used outside the Menu component.'
    );
  }

  const { start, stop, reset } = context;

  return (
    <div className="buttons">
      <button onClick={start} className={[styles.button, 'start'].join(' ')}>
        Start
      </button>
      <button onClick={stop} className={[styles.button, 'stop'].join(' ')}>
        Stop
      </button>
      <button onClick={reset} className={[styles.button, 'reset'].join(' ')}>
        Reset
      </button>
    </div>
  );
}

export default Buttons;
