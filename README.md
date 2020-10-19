This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Labyrinth Challenge

Coding challenge repo.

### Demo

Play the game [DEMO](https://flamboyant-lewin-c8ee14.netlify.app/). Use arrow keys to move arround.

### Game State Machine

This games uses xState for managing the state of the game.

Take a look at the state machine [here](https://xstate.js.org/viz/?gist=9d88d6f029496494396533ca9cd58bb7)

### Extensibility

New levels can be added by creating and importing the initial level on the `data` folder.

### Portability

The Game engine can be used with other frameworks such as Vue, Angular, etc. You just need to re-implement the graphical interface.

### Things I would like to add

I didn't had enought time to add model based testing with [xstate-test](https://xstate.js.org/docs/packages/xstate-test/)
