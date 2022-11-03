import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
  GameDetailQueryArgsDto,
  GameDetailQueryResponseDto,
  OwnerDashboardQueryArgsDto,
  OwnerDashboardQueryResponseDto,
  OwnerDto,
  TeamDetailQueryArgsDto,
  TeamDetailQueryResponseDto,
} from '../services/dtos';
import {GamesService} from '../services/games';
import {OwnersService} from '../services/owners';
import {TeamsService} from '../services/teams';
import {useAuth} from './auth';
import {useNotification} from './notification';

const DataContext = React.createContext<Data | undefined>(undefined);

export interface WithRefresher {
  refresh: (showLoadingIndicator?: boolean) => Promise<void>;
}

export interface WithLoader {
  load: (id: string, showLoadingIndicator?: boolean) => Promise<void>;
}

export interface WithLocalState<L> {
  setLocalState: (item: L) => Promise<void>;
  localState: L;
}
export interface DataItemSegment<T> {
  item: T;
  isLoading: boolean;
}
export interface LocalGameState {
  lastPlayedSequence?: string;
  expectedSequence?: string;
}

export type ActiveGame = DataItemSegment<GameDetailQueryResponseDto> &
  WithLoader &
  WithLocalState<LocalGameState>;
interface Data {
  ownerDashboard: DataItemSegment<OwnerDashboardQueryResponseDto> &
    WithRefresher;
  systemDashboard: DataItemSegment<OwnerDashboardQueryResponseDto> &
    WithRefresher;
  activeGame: ActiveGame;
  activeTeam: DataItemSegment<TeamDetailQueryResponseDto> & WithLoader;
  clearAll: () => void;
  localStore: {
    get: <T>(key: string) => Promise<T | undefined>;
    set: <T>(key: string, value: T) => Promise<void>;
    clear: () => Promise<void>;
  };
}

type Properties = {
  children: React.ReactNode;
};

const DataProvider: React.FC<Properties> = ({children}) => {
  const [ownerDashboard, setOwnerDashboard] =
    React.useState<OwnerDashboardQueryResponseDto>(
      new OwnerDashboardQueryResponseDto(),
    );
  const [isOwnerDashboardLoading, setIsOwnerDashboardLoading] =
    React.useState(true);

  const [systemDashboard, setSystemDashboard] =
    React.useState<OwnerDashboardQueryResponseDto>(
      new OwnerDashboardQueryResponseDto(),
    );
  const [isSystemDashboardLoading, setIsSystemDashboardLoading] =
    React.useState(true);

  const [activeGame, setActiveGame] =
    React.useState<GameDetailQueryResponseDto>(
      new GameDetailQueryResponseDto(),
    );
  const [activeGameLocalState, setActiveGameLocalState] =
    React.useState<LocalGameState>({lastPlayedSequence: '-1'});
  const [isActiveGameLoading, setIsActiveGameLoading] = React.useState(true);

  const [activeTeam, setActiveTeam] =
    React.useState<TeamDetailQueryResponseDto>(
      new TeamDetailQueryResponseDto(),
    );
  const [isActiveTeamLoading, setIsActiveTeamLoading] = React.useState(true);

  const auth = useAuth();
  const {addListener, removeListener} = useNotification();

  const getLocalData = React.useCallback(
    async <T,>(key: string): Promise<T | undefined> => {
      const jsonValue = await AsyncStorage.getItem(`@fourd:${key}`);
      return jsonValue != null ? (JSON.parse(jsonValue) as T) : undefined;
    },
    [],
  );

  const setLocalData = React.useCallback(
    async <T,>(key: string, value: T): Promise<void> => {
      await AsyncStorage.setItem(`@fourd:${key}`, JSON.stringify(value));
    },
    [],
  );

  const clearLocalData = React.useCallback(async (): Promise<void> => {
    const keys = (await AsyncStorage.getAllKeys()) as string[];
    await AsyncStorage.multiRemove(
      keys.filter(key => {
        return key.startsWith('@fourd');
      }),
    );
  }, []);

  const refreshOwnerDashboard = React.useCallback(
    async (showLoadingIndicator = true) => {
      console.log('fetching owner dashboard');
      if (showLoadingIndicator) {
        setIsOwnerDashboardLoading(true);
      }

      const service = new OwnersService();
      if (!(await service.ownerExists(auth.user?.username as string))) {
        const ownerDto = new OwnerDto();
        ownerDto.id = auth.user?.username as string;
        ownerDto.name = auth.user?.username as string;
        ownerDto.email = auth.user?.email as string;
        await service.createOwner(ownerDto);
      }

      const fetchedOwnerDashboard = await service.queryOwnerDashboard(
        new OwnerDashboardQueryArgsDto().init({
          id: auth.user?.username as string,
        }),
      );

      setOwnerDashboard(fetchedOwnerDashboard);
      if (showLoadingIndicator) {
        setIsOwnerDashboardLoading(false);
      }
    },
    [auth.user],
  );

  const refreshSystemDashboard = React.useCallback(
    async (showLoadingIndicator = true) => {
      if (showLoadingIndicator) {
        setIsSystemDashboardLoading(true);
      }

      const service = new OwnersService();
      const fetchedSystemDashboard = await service.queryOwnerDashboard(
        new OwnerDashboardQueryArgsDto().init({
          id: 'system',
        }),
      );

      setSystemDashboard(fetchedSystemDashboard);
      if (showLoadingIndicator) {
        setIsSystemDashboardLoading(false);
      }
    },
    [],
  );

  const loadActiveGame = React.useCallback(
    async (id: string, showLoadingIndicator = true) => {
      if (showLoadingIndicator) {
        setIsActiveGameLoading(true);
      }
      const teamsService = new GamesService();
      setActiveGame(
        await teamsService.queryGameDetail(
          new GameDetailQueryArgsDto().init({id}),
        ),
      );
      setActiveGameLocalState(
        (await getLocalData<LocalGameState>(`${id}-state`)) || {
          lastPlayedSequence: '-1',
        },
      );

      if (showLoadingIndicator) {
        setIsActiveGameLoading(false);
      }
    },
    [getLocalData],
  );

  const loadActiveTeam = React.useCallback(
    async (id: string, showLoadingIndicator = true) => {
      if (showLoadingIndicator) {
        setIsActiveTeamLoading(true);
      }
      const teamsService = new TeamsService();
      setActiveTeam(
        await teamsService.queryTeamDetail(
          new TeamDetailQueryArgsDto().init({id}),
        ),
      );

      if (showLoadingIndicator) {
        setIsActiveTeamLoading(false);
      }
    },
    [],
  );

  const clearAll = React.useCallback(() => {
    setIsOwnerDashboardLoading(true);
    setOwnerDashboard(new OwnerDashboardQueryResponseDto());
    setActiveGame(new GameDetailQueryResponseDto());
    setActiveTeam(new TeamDetailQueryResponseDto());
    setIsOwnerDashboardLoading(false);
  }, []);

  const setLocalGameStateCb = React.useCallback(
    async (item: LocalGameState) => {
      await setLocalData<LocalGameState>(`${activeGame?.id}-state`, item);
    },
    [activeGame?.id, setLocalData],
  );

  React.useEffect(() => {
    if (auth.user) {
      refreshOwnerDashboard();
      refreshSystemDashboard();
    }
  }, [auth.user, refreshOwnerDashboard, refreshSystemDashboard]);

  React.useEffect(() => {
    console.log('mounting data provider');
    addListener({
      eventType: 'games',
      id: 'data-provider-games-listener',
      callback: () => {
        console.log('owner dashboard refresher');
        refreshOwnerDashboard();
      },
    });
    addListener({
      eventType: 'game-requests',
      id: 'data-provider-game-requests-listener',
      callback: () => {
        console.log('owner dashboard refresher');
        refreshOwnerDashboard();
      },
    });
    addListener({
      eventType: 'game-invites',
      id: 'data-provider-game-invites-listener',
      callback: () => {
        console.log('owner dashboard refresher');
        refreshOwnerDashboard();
      },
    });

    return () => {
      removeListener('data-provider-games-listener');
      removeListener('data-provider-game-requests-listener');
      removeListener('data-provider-game-invites-listener');
    };
  }, [addListener, removeListener, refreshOwnerDashboard]);

  return (
    <DataContext.Provider
      value={{
        ownerDashboard: {
          item: ownerDashboard,
          isLoading: isOwnerDashboardLoading,
          refresh: refreshOwnerDashboard,
        },
        systemDashboard: {
          item: systemDashboard,
          isLoading: isSystemDashboardLoading,
          refresh: refreshSystemDashboard,
        },
        activeGame: {
          item: activeGame,
          isLoading: isActiveGameLoading,
          load: loadActiveGame,
          setLocalState: setLocalGameStateCb,
          localState: activeGameLocalState,
        },
        activeTeam: {
          item: activeTeam,
          isLoading: isActiveTeamLoading,
          load: loadActiveTeam,
        },
        clearAll,
        localStore: {
          get: getLocalData,
          set: setLocalData,
          clear: clearLocalData,
        },
      }}>
      {children}
    </DataContext.Provider>
  );
};

const useData = () => {
  const context = React.useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }

  return context;
};

export {DataProvider, useData};
