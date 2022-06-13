import { render, screen } from '@testing-library/react'
import { GLOBAL_TIME } from '../../config/constants';
import Timer from '../Timer'

test('It should render the countdown', () => {

    const time = 45;
    render(
        <Timer count={time} />
    )
    const total = screen.getByTestId("timer");
    const countDown = Math.floor(GLOBAL_TIME - time)
    expect(total).toHaveTextContent("Time: " + countDown)
})
