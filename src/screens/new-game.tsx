import React from 'react';
import {Stack} from '../components/navigation/stack-pager';
import {ChildrenProps, StateProp} from '../types/types';
import {SelectGameTypeScreen} from './select-game-type';

interface NewGameScreenProps {}

interface NewGameContextProps {
  gameType: StateProp<string | undefined>;
  opponent: StateProp<string | undefined>;
  team: StateProp<string | undefined>;
}
const NewGameContext = React.createContext<NewGameContextProps | undefined>(
  undefined,
);

interface NewGameProviderProps extends ChildrenProps {}
export const NewGameProvider: React.FC<NewGameProviderProps> = props => {
  const [gameType, setGameType] = React.useState<string>();
  const [opponent, setOpponent] = React.useState<string>();
  const [team, setTeam] = React.useState<string>();

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
      <NewGameProvider>
        <Stack.StackProvider>
          <Stack.StackPager initialPage={<SelectGameTypeScreen />} />
        </Stack.StackProvider>
      </NewGameProvider>
    </>
  );
};
