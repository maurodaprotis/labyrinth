import React, { useEffect } from 'react';
import useKey from 'use-key-hook';
import { createGameMachine, initialContext } from './engine/gameMachine';
import { useMachine } from '@xstate/react';
import { Board } from './components/Board';
import { StatusBar } from './components/StatusBar';
import { Header } from './components/Header';

import './App.css';
import levelOne from './data/level-one.json';

const gameMachine = createGameMachine(levelOne as initialContext);

const ARROW_LEFT = 37;
const ARROW_UP = 38;
const ARROW_RIGHT = 39;
const ARROW_DOWN = 40;

function App() {
  const [current, send] = useMachine(gameMachine);

  useKey(() => send('MOVE_UP'), {
    detectKeys: [ARROW_UP],
  });
  useKey(() => send('MOVE_DOWN'), {
    detectKeys: [ARROW_DOWN],
  });
  useKey(() => send('MOVE_LEFT'), {
    detectKeys: [ARROW_LEFT],
  });
  useKey(() => send('MOVE_RIGHT'), {
    detectKeys: [ARROW_RIGHT],
  });

  const { context } = current;

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--x', `${context.x}`);
    root.style.setProperty('--y', `${context.y}`);
    root.style.setProperty('--game-columns', `${context.maxX}`);
  }, [context.maxX, context.x, context.y]);

  return (
    <div className="App">
      <Header text="Labyrinth Challenge" />
      <Board cells={context.cells} />
      <StatusBar
        movesLeft={context.movesLeft}
        state={current.value.toString()}
        reset={() => send('RESET')}
      />
    </div>
  );
}

export default App;
