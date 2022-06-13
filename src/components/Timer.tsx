import { GLOBAL_TIME } from "../config/constants";
import { ITimer } from "../types/definitions";

const Timer = ({ count }: ITimer) => (
    <div className="timer" data-testid="timer">Time: {Math.floor(GLOBAL_TIME - count)}</div>
);

export default Timer;