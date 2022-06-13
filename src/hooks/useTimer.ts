import { useCallback, useEffect, useRef, useState } from "react";
import {
    BOMB_DURATION,
  GLOBAL_TIME,
  NUMBER_OF_BOMBS,
  NUMBER_OF_HOLES,
} from "../config/constants";
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

  const calculatePoints = (value: IMole, i: number) => {
    let molesOnScreen: number = 0;

    gameMap[i].isUp = 0;
    gameMap[i].isBomb = false;

    gameMap.forEach((v) => {
      if (v.isUp) {
        molesOnScreen += 1;
      }
    });

    if (molesOnScreen >= 4) {
      setPoint((prevState) => prevState + 256);
    } else if (molesOnScreen === 3) {
      setPoint((prevState) => prevState + 16);
    } else if (molesOnScreen === 2) {
      setPoint((prevState) => prevState + 16);
    } else {
      setPoint((prevState) => prevState + 1);
    }
  };

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

  const selectMole: any = useCallback((prevState?: IMole[]) => {
    let random: number = Math.floor(Math.random() * NUMBER_OF_HOLES);
    if (prevState && prevState[random].isUp) {
      return selectMole(prevState);
    }
    return random;
  }, []);

  const calculateSeconds = useCallback(() => {
    setCount((prevState) => prevState + 0.5);
    getDeployTime(count);

    setGameMap((prevState) => {
      const random = selectMole(prevState);

      //run each second
      if (count === 0 || count % 1 === 0) {
        prevState.forEach((v, i) => {
          if (v.isUp) {
            if (duration >= 1) {
              prevState[i].isUp -= 1;
            } else {
              prevState[i].isUp -= 0.5;
            }
          } else {
            prevState[i].isBomb = false;
          }
        });

        if (bombMap.includes(count)) {
          prevState[random].isBomb = true;
        }

        if (prevState[random].isBomb) {
          prevState[random].isUp = BOMB_DURATION;
        } else {
          prevState[random].isUp = duration;
        }
      }
      return prevState;
    });
  }, [bombMap, count, duration, selectMole]);

  const startTimer = useCallback(() => {
    time.current = setTimeout(() => {
      reference.current += 0.5;
      calculateSeconds();
    }, 500);
  }, [calculateSeconds]);

  const resetTimer = useCallback(() => {
    if (count) {
      clearInterval(time.current);
      reference.current = 0;
      setCount(0);
      setStartedGame(false);
      setPoint(0);
      setGameMap(initialGameMap);
      // window.location.reload()
    }
  }, [count, initialGameMap]);

  useEffect(() => {
    if (startedGame && count < GLOBAL_TIME) {
      startTimer();
    } else {
      resetTimer();
    }
    return () => clearInterval(time.current);
  }, [count, resetTimer, startTimer, startedGame]);

  const generateBombMap = () => {
    let array: number[] = [];
    let random: number;

    for (let i = 0; i < NUMBER_OF_BOMBS; i++) {
      do {
        random = generateRandomNumber();
      } while (array.includes(random));
      array[i] = random;
    }
    setBombMap(array);
  };

  useEffect(() => {
    generateBombMap();
  }, []);

  return {
    count,
    startedGame,
    setStartedGame,
    calculatePoints,
    points,
    gameMap,
    resetTimer,
  };
}
