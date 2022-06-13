# Getting Started with Create React App

The game needs to run in a 4x4 grid, and be responsive to be playable on a desktop web browser and on a mobile phone browser.

A game should last for 60 seconds.

Moles should pop up every 1 second in randomly selected holes of the grid

For the first 10 seconds, moles should stay up for 5 seconds
For the next 10 seconds, moles should stay up for 4 seconds
Every 10 seconds the moles should pop up for 1 second less, with a floor of 0.5 seconds

If a user hits a mole they score 1 point
If a user hits 2 moles simultaneously they score 4 points
For 3 moles 16 points
For 4 moles 256 points

At random intervals, and not more than 4 times during a 60-second game a "bomb" should pop up for 3 seconds. If the user hits the bomb the game ends.

The game must show the running score total while playing
