import { useCallback, useEffect, useRef, useState } from "react";
import { GLOBAL_TIME } from "../config/constants";
import { ITime } from "../types/definitions";

export default function useTimer() {
  const reference = useRef<number>(0);
  const time: ITime = useRef();
  const [count, setCount] = useState<number>(0);
  const [startedGame, setStartedGame] = useState<boolean>(false);
  const [points, setPoint] = useState<number>(0);
  const [gameMap, setGameMap] = useState<any[]>([]);


  const calculatePoints = () => {
      setPoint(prevState => prevState + 1)
  }

  const calculateSeconds = useCallback(() => {
    setCount((prevState) => prevState + 0.5);

    if (reference.current % 1 === 0) {
      console.log("1sec");
    }
  }, []);

  const startTimer = useCallback(() => {
    time.current = setTimeout(() => {
      reference.current += 0.5;
      calculateSeconds();
    }, 500);
  }, [calculateSeconds]);

  const resetTimer = useCallback(() => {
    if (count) {
      setCount(0);
      reference.current = 0;
      setStartedGame(false);
    }
  }, [count]);

  useEffect(() => {
    if (startedGame && count < GLOBAL_TIME) {
      startTimer();
    } else {
      resetTimer();
    }
    return () => clearInterval(time.current);
  }, [count, resetTimer, startTimer, startedGame]);

  return { count, startedGame, setStartedGame, calculatePoints, points, gameMap };
}
