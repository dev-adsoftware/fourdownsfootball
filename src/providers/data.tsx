import React from 'react';
import {
  GameDetailQueryArgsDto,
  GameDetailQueryResponseDto,
  NotificationDto,
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

const DataContext = React.createContext<Data | undefined>(undefined);

export interface DataSetSegment<T> {
  items: T[];
  isLoading: boolean;
  refresh: () => Promise<void>;
}

export interface DataItemSegment<T> {
  item?: T;
  isLoading: boolean;
  refresh: () => Promise<void>;
}

export interface DataItemWithSetterSegment<T> {
  item?: T;
  isLoading: boolean;
  set: (item: T) => void;
  refresh: () => Promise<void>;
}

interface Data {
  ownerDashboard: DataItemSegment<OwnerDashboardQueryResponseDto>;
  systemDashboard: DataItemSegment<OwnerDashboardQueryResponseDto>;
  activeGame: DataItemWithSetterSegment<GameDetailQueryResponseDto>;
  activeTeam: DataItemWithSetterSegment<TeamDetailQueryResponseDto>;
  clearAll: () => void;
  queueNotification: (notification: NotificationDto) => void;
}

type Action =
  | {type: 'queue-notification'; payload: NotificationDto}
  | {type: 'pop-notification'};

const reducer = (
  state: NotificationDto[],
  action: Action,
): NotificationDto[] => {
  switch (action.type) {
    case 'queue-notification':
      const newState = [...state];
      newState.push(action.payload);
      return newState;
    case 'pop-notification':
      let poppedState = [...state];
      poppedState = poppedState.slice(1);
      return poppedState;
  }
};

type Properties = {
  children: React.ReactNode;
};

const DataProvider: React.FC<Properties> = ({children}) => {
  const [notificationQueueState, notificationQueueDispatch] = React.useReducer(
    reducer,
    [],
  );

  const [ownerDashboard, setOwnerDashboard] =
    React.useState<OwnerDashboardQueryResponseDto>();
  const [isOwnerDashboardLoading, setIsOwnerDashboardLoading] =
    React.useState(true);

  const [systemDashboard, setSystemDashboard] =
    React.useState<OwnerDashboardQueryResponseDto>();
  const [isSystemDashboardLoading, setIsSystemDashboardLoading] =
    React.useState(true);

  const [activeGame, setActiveGame] =
    React.useState<GameDetailQueryResponseDto>();
  const [isActiveGameLoading, setIsActiveGameLoading] = React.useState(true);

  const [activeTeam, setActiveTeam] =
    React.useState<TeamDetailQueryResponseDto>();
  const [isActiveTeamLoading, setIsActiveTeamLoading] = React.useState(true);

  const auth = useAuth();

  const refreshOwnerDashboard = React.useCallback(
    async (showLoadingIndicator = true) => {
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

  const refreshActiveGame = React.useCallback(
    async (showLoadingIndicator = true) => {
      if (!activeGame?.id) {
        return;
      }

      if (showLoadingIndicator) {
        setIsActiveGameLoading(true);
      }
      const gamesService = new GamesService();
      setActiveGame(
        await gamesService.queryGameDetail(
          new GameDetailQueryArgsDto().init({id: activeGame?.id as string}),
        ),
      );

      if (showLoadingIndicator) {
        setIsActiveGameLoading(false);
      }
    },
    [activeGame?.id],
  );

  const refreshActiveTeam = React.useCallback(
    async (showLoadingIndicator = true) => {
      if (!activeTeam?.id) {
        return;
      }

      if (showLoadingIndicator) {
        setIsActiveTeamLoading(true);
      }
      const teamsService = new TeamsService();
      setActiveTeam(
        await teamsService.queryTeamDetail(
          new TeamDetailQueryArgsDto().init({id: activeTeam?.id as string}),
        ),
      );

      if (showLoadingIndicator) {
        setIsActiveTeamLoading(false);
      }
    },
    [activeTeam?.id],
  );

  const clearAll = React.useCallback(() => {
    setIsOwnerDashboardLoading(true);
    setOwnerDashboard(undefined);
    setActiveGame(undefined);
    setActiveTeam(undefined);
    setIsOwnerDashboardLoading(false);
  }, []);

  React.useEffect(() => {
    if (auth.user) {
      refreshOwnerDashboard();
    }
  }, [auth.user, refreshOwnerDashboard]);

  React.useEffect(() => {
    if (auth.user) {
      refreshSystemDashboard();
    }
  }, [auth.user, refreshSystemDashboard]);

  React.useEffect(() => {
    if (auth.user) {
      refreshActiveGame();
    }
  }, [auth.user, refreshActiveGame]);

  React.useEffect(() => {
    if (auth.user) {
      refreshActiveTeam();
    }
  }, [auth.user, refreshActiveTeam]);

  React.useEffect(() => {
    if (notificationQueueState.length > 0) {
      const notification = notificationQueueState[0];
      notificationQueueDispatch({type: 'pop-notification'});

      if (notification.recordType === 'games') {
        if (activeGame?.id === notification.recordId) {
          refreshActiveGame(false)
            .then(() => console.log('refreshed active game'))
            .catch(e => console.log(e));
        }
        refreshOwnerDashboard(false)
          .then(() => console.log('refreshed owner dashboard'))
          .catch(e => console.log(e));
      } else if (notification.recordType === 'game-requests') {
        refreshOwnerDashboard(false)
          .then(() => console.log('refreshed owner dashboard'))
          .catch(e => console.log(e));
      } else if (notification.recordType === 'game-invites') {
        refreshOwnerDashboard(false)
          .then(() => console.log('refreshed owner dashboard'))
          .catch(e => console.log(e));
      }
    }
  }, [
    notificationQueueState,
    activeGame,
    refreshActiveGame,
    refreshOwnerDashboard,
  ]);

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
          set: setActiveGame,
          refresh: refreshActiveGame,
        },
        activeTeam: {
          item: activeTeam,
          isLoading: isActiveTeamLoading,
          set: setActiveTeam,
          refresh: refreshActiveTeam,
        },
        clearAll,
        queueNotification: (notification: NotificationDto) => {
          notificationQueueDispatch({
            type: 'queue-notification',
            payload: notification,
          });
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
