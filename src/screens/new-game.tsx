import React from 'react';
import {StackPager, StackProvider} from '../components/navigation/stack-pager';
import {ChildrenProps, StateProp} from '../types/types';
import {SelectGameTypeScreen} from './select-game-type';

interface NewGameScreenProps {
  onGameCreated: () => void;
}

interface NewGameContextProps {
  gameType: StateProp<string | undefined>;
  opponent: StateProp<string | undefined>;
  team: StateProp<string | undefined>;
  createGame: () => Promise<void>;
  isCreatingGame: boolean;
  onGameCreated: () => void;
}
const NewGameContext = React.createContext<NewGameContextProps | undefined>(
  undefined,
);

interface NewGameProviderProps extends ChildrenProps {
  onGameCreated: () => void;
}

export const NewGameProvider: React.FC<NewGameProviderProps> = props => {
  const [gameType, setGameType] = React.useState<string>();
  const [opponent, setOpponent] = React.useState<string>();
  const [team, setTeam] = React.useState<string>();
  const [isCreatingGame, setIsCreatingGame] = React.useState<boolean>(false);

  const createGame = React.useCallback(async () => {
    setIsCreatingGame(true);
    setTimeout(() => {
      props.onGameCreated();
    }, 2000);
  }, []);

  return (
    <NewGameContext.Provider
      value={{
        gameType: {
          value: gameType,
          set: setGameType,
        },
        opponent: {
          value: opponent,
          set: setOpponent,
        },
        team: {
          value: team,
          set: setTeam,
        },
        createGame,
        isCreatingGame,
        onGameCreated: props.onGameCreated,
      }}>
      {props.children}
    </NewGameContext.Provider>
  );
};

export const useNewGame = () => {
  const context = React.useContext(NewGameContext);
  if (context === undefined) {
    throw new Error('useNewGame must be used within a NewGameProvider');
  }
  return context;
};

export const NewGameScreen: React.FC<NewGameScreenProps> = props => {
  return (
    <>
      <NewGameProvider onGameCreated={props.onGameCreated}>
        <StackProvider>
          <StackPager initialPage={<SelectGameTypeScreen />} />
        </StackProvider>
      </NewGameProvider>
    </>
  );
};
