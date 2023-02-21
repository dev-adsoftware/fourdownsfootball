import React from 'react';
import uuid from 'react-native-uuid';
import {StackPager, StackProvider} from '../components/navigation/stack-pager';
import {useData} from '../providers/data';
import {GameRequestDto, OwnerDto, TeamDto} from '../services/dtos';
import {GameState} from '../services/dtos/types/game-state';
import {ChildrenProps, StateProp} from '../types/types';
import {SelectGameTypeScreen} from './select-game-type';

interface NewGameScreenProps {
  onGameCreated: () => void;
}

interface NewGameContextProps {
  gameType: StateProp<string | undefined>;
  opponent: StateProp<OwnerDto | undefined>;
  team: StateProp<TeamDto | undefined>;
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
  const [opponent, setOpponent] = React.useState<OwnerDto>();
  const [team, setTeam] = React.useState<TeamDto>();
  const [isCreatingGame, setIsCreatingGame] = React.useState<boolean>(false);

  const data = useData();

  const {onGameCreated} = props;

  const createGame = React.useCallback(async () => {
    setIsCreatingGame(true);

    const game = new GameRequestDto().init({
      id: uuid.v4(),
      ownerId: data.owner?.id,
      teamId: team?.id,
      invitedOwnerId: opponent?.id,
      homeAway: 'home',
      status: GameState.AwaitingRSVP,
      sequence: '0',
      lastUpdateDate: new Date().toISOString(),
      lastUpdatedBy: data.owner?.id,
    });

    await data.services.games.createGame(game);
    console.log('game creation done');
    onGameCreated();
  }, [opponent, team, data.services.games, data.owner, onGameCreated]);

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
