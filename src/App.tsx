import { FC } from "react";
import Hole from "./components/Hole";
import Points from "./components/Points";
import Timer from "./components/Timer";
import useTimer from "./hooks/useTimer";
import { IMole } from "./types/definitions";
import "./App.css";

const App: FC = () => {
  const {
    count,
    setStartedGame,
    startedGame,
    calculatePoints,
    points,
    gameMap,
    resetTimer
  } = useTimer();

  const handleKill = (v: IMole, i: number) => {
    if (v.isBomb) {
      alert(`You clicked in a bomb. End of the game with ${points} points!`);
      resetTimer();
    } else {
      calculatePoints(v, i);
    }
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
        {gameMap &&
          gameMap.map((val: IMole, i: number) => {
            return (
              <Hole
                key={i}
                isUp={val.isUp}
                isBomb={val.isBomb}
                onClick={() => handleKill(val, i)}
              />
            );
          })}
      </div>
    </>
  );
}

export default App;
