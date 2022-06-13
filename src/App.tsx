import './App.css';
import useTimer from './hooks/useTimer';

function App() {
  const { count, reference, setStartedGame, startedGame } = useTimer();
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
          <div>Ref: {reference.current}</div>
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
