import "./App.css";
import Hole from "./components/Hole";
import Points from "./components/Points";
import Timer from "./components/Timer";
import useTimer from "./hooks/useTimer";

function App() {
  const {
    count,
    setStartedGame,
    startedGame,
    calculatePoints,
    points,
    gameMap,
  } = useTimer();

  const handleKill = () => {
    // check if is bomb
    calculatePoints();
  };

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
            data-testid="startend"
          />
          <Timer count={count} />
          <Points totalPoints={points} />
        </div>
      </div>

      <div className="game-board">
        {gameMap.map((v: any) => {
          return (
            <Hole
              isUp={v.isUp}
              isBomb={v.isBomb}
              onClick={() => handleKill()}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
