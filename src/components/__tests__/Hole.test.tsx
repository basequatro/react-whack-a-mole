import { fireEvent, render, screen } from "@testing-library/react";
import Hole from "../Hole";

test("It should render Hole", () => {
    render(<Hole isBomb={false} isUp={0} onClick={null} />);
    const hole = screen.getByTestId("hole");
    expect(hole).toBeInTheDocument();
});

test("It should render the Mole Bomb", () => {
    render(<Hole isBomb={true} isUp={5} onClick={null} />);
    const hole = screen.getByTestId("moleup-bomb");
    expect(hole).toBeInTheDocument();
});

test("It should render the Mole", () => {
    render(<Hole isBomb={false} isUp={5} onClick={null} />);
    const hole = screen.getByTestId("moleup");
    expect(hole).toBeInTheDocument();
});


test("It should hide the Mole", () => {
    render(<Hole isBomb={false} isUp={0} onClick={null} />);
    const hole = screen.getByTestId("mole");
    expect(hole).toBeInTheDocument();
});

test("check if onCLick is called", () => {
    const props = {
        onClick: jest.fn(),
        isBomb: true,
        isUp: 5,
    };

    render(<Hole {...props} />);
    const mole = screen.getByTestId("moleup-bomb");
    fireEvent.click(mole);
    expect(props.onClick).toHaveBeenCalledTimes(1);
});
