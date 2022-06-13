import { IPoints } from "../types/definitions";

const Points = ({ totalPoints }: IPoints) => (
    <div className="score" data-testid="score">Points: {totalPoints}</div>
);

export default Points;