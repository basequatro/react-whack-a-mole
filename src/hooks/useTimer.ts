import { useCallback, useEffect, useRef, useState } from "react";
import { GLOBAL_TIME, NUMBER_OF_HOLES } from "../config/constants";
import { IMole, ITime } from "../types/definitions";

export default function useTimer() {
  const reference = useRef<number>(0);
  const time: ITime = useRef();
  const [count, setCount] = useState<number>(0);
  const [startedGame, setStartedGame] = useState<boolean>(false);
  const [points, setPoint] = useState<number>(0);
  const [duration, setDuration] = useState<number>(5);
  const [bombMap, setBombMap] = useState<number[]>([]);
  const initialGameMap: IMole[] = Array.from(
    { length: NUMBER_OF_HOLES },
    () => ({
      isUp: 0,
      isBomb: false,
    })
  );
  const [gameMap, setGameMap] = useState<any[]>(initialGameMap);


  const generateRandomNumber = () => {
    return Math.floor(Math.random() * GLOBAL_TIME);
  };

  const calculatePoints = () => {
      setPoint(prevState => prevState + 1)
  }

  const getDeployTime = (time: number) => {
    const countDown: number = GLOBAL_TIME - time;
    if (countDown > 50) {
      setDuration(5);
    } else if (countDown > 40) {
      setDuration(4);
    } else if (countDown > 30) {
      setDuration(3);
    } else if (countDown > 20) {
      setDuration(2);
    } else if (countDown > 10) {
      setDuration(1);
    } else {
      setDuration(0.5);
    }
  };
  

  const calculateSeconds = useCallback(() => {
    setCount((prevState) => prevState + 0.5);
    getDeployTime(count);

    setGameMap(prevState => {
        const random = generateRandomNumber()
        prevState[random].isUp = duration
        prevState.forEach(v => {
            if(v.isUp) {
                prevState[random].isUp -= 1
            }
        })
        return prevState;
    })
    
    if (reference.current % 1 === 0) {
      console.log("1sec", duration);
      
    }
  }, [count, duration]);

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
