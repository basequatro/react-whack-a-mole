import { useCallback, useEffect, useRef, useState } from "react";
import { start } from "repl";
import { ITime } from "../types/definitions";

export default function useTimer() {
  const [count, setCount] = useState<number>(0);
  const reference = useRef<number>(0);
  const time: ITime = useRef();

  const calculateSeconds = useCallback(() => {
    setCount((prevState) => prevState + 0.5);

    if (reference.current % 1 === 0) {
        console.log('1sec')
    }
  }, []);

  const startTimer = useCallback(() => {
    time.current = setTimeout(() => {
      reference.current += 0.5;
      calculateSeconds();
    }, 500);
  }, [calculateSeconds]);

  useEffect(() => {
    startTimer();
  }, [count, startTimer]);

  return { count, reference, startTimer };
}
