import StopWatch from './components/stop-watch/Watch';
import StopWatchDisplay from './components/stop-watch/Display';
import StopWatchButtons from './components/stop-watch/Buttons';

import './App.css';

function App() {
  return (
    <StopWatch>
      <StopWatchDisplay />
      <StopWatchButtons />
    </StopWatch>
  );
}

export default App;
