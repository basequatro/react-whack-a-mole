
const Hole = ({ isUp, isBomb }: any) => (
    <div className="hole" data-testid="hole">
        {isUp && !isBomb && <div className="mole" />}
        {isUp && isBomb && <div className="molebomb" />}
    </div>
);

export default Hole;