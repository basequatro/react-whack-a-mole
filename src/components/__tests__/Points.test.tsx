import { render, screen } from '@testing-library/react'
import Points from '../Points'

test('It should render the total points', () => {
    render(
        <Points totalPoints={10} />
    )
    const total = screen.getByTestId("score")
    console.log('total')
    expect(total).toHaveTextContent("Points: 10")
})
