import './App.css';
import useTimer from './hooks/useTimer';

function App() {
  const { count, reference, startTimer } = useTimer();
  return (
    <>
      <div className="header">
        <h1>Whac-A-Mole</h1>

        <div className="controls">
          <input
            type="button"
            className="start-button"
            value={"START GAME"}
            onClick={() => startTimer()}
          />
          <div>Timer: {Math.ceil(count)}</div>
        </div>
      </div>

      <div className="game-board">
        <div>x</div>
        <div>x</div>
        <div>x</div>
        <div>x</div>
        <div>x</div>
        <div>x</div>
        <div>x</div>
        <div>x</div>
        <div>x</div>
        <div>x</div>
        <div>x</div>
        <div>x</div>
        <div>x</div>
        <div>x</div>
        <div>x</div>
        <div>x</div>
      </div>
    </>
  );
}

export default App;
