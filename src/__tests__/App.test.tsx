import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('renders render title', () => {
    render(<App />);
    const linkElement = screen.getByText(/Whac-A-Mole/i);
    expect(linkElement).toBeInTheDocument();
});

it('can click start, on the mole to get more score and finish', async () => {
    render(<App />);

    //test if starts with 60t 0p
    expect(screen.getByText('Time: 60')).toBeInTheDocument();
    expect(screen.getByText('Points: 0')).toBeInTheDocument();

    // Click starts and check time =)
    const start = screen.getByTestId('startend')
    userEvent.click(start);
    await new Promise((r) => setTimeout(r, 1000));
    expect(screen.getByText('Time: 59')).toBeInTheDocument();

    // click mole and check point
    const mole = screen.getByTestId('moleup')
    console.log('mole', mole)
    userEvent.click(mole);
    screen.getByText('Points: 1')

    // Check reset State =)
    userEvent.click(start);
    expect(screen.getByText('Time: 60')).toBeInTheDocument();
    expect(screen.getByText('Points: 0')).toBeInTheDocument();

});
