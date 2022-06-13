import './App.css';
import useTimer from './hooks/useTimer';

function App() {
  const { count, setStartedGame, startedGame, calculatePoints, points } = useTimer();

  const handleKill = () => {
    // check if is bomb
    calculatePoints()
  }

  return (
    <>
      <div className="header">
        <h1>Whac-A-Mole</h1>

        <div className="controls">
          <input
            type="button"
            className="start-button"
            value={startedGame ? "END GAME" : "START GAME"}
            onClick={() => setStartedGame(startedGame ? false : true)}

          />
          <div>Timer: {Math.floor(count)}</div>
          <div>Points: {points}</div>
        </div>
      </div>

      <div className="game-board">
        <div onClick={() => handleKill()}>x</div>
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
