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
  activeGame: DataItemWithSetterSegment<GameDetailQueryResponseDto>;
  activeTeam: DataItemWithSetterSegment<TeamDetailQueryResponseDto>;
  clearAll: () => void;
}

type Properties = {
  children: React.ReactNode;
};

const DataProvider: React.FC<Properties> = ({children}) => {
  const [ownerDashboard, setOwnerDashboard] =
    React.useState<OwnerDashboardQueryResponseDto>();
  const [isOwnerDashboardLoading, setIsOwnerDashboardLoading] =
    React.useState(true);

  const [activeGame, setActiveGame] =
    React.useState<GameDetailQueryResponseDto>();
  const [isActiveGameLoading, setIsActiveGameLoading] = React.useState(true);

  const [activeTeam, setActiveTeam] =
    React.useState<TeamDetailQueryResponseDto>();
  const [isActiveTeamLoading, setIsActiveTeamLoading] = React.useState(true);

  const auth = useAuth();

  const refreshOwnerDashboard = React.useCallback(async () => {
    setIsOwnerDashboardLoading(true);

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
    setIsOwnerDashboardLoading(false);
  }, [auth.user]);

  const refreshActiveGame = React.useCallback(async () => {
    if (!activeGame?.id) {
      return;
    }

    setIsActiveGameLoading(true);
    const gamesService = new GamesService();
    setActiveGame(
      await gamesService.queryGameDetail(
        new GameDetailQueryArgsDto().init({id: activeGame?.id as string}),
      ),
    );
    setIsActiveGameLoading(false);
  }, [activeGame?.id]);

  const refreshActiveTeam = React.useCallback(async () => {
    if (!activeTeam?.id) {
      return;
    }

    setIsActiveTeamLoading(true);
    const teamsService = new TeamsService();
    setActiveTeam(
      await teamsService.queryTeamDetail(
        new TeamDetailQueryArgsDto().init({id: activeTeam?.id as string}),
      ),
    );
    setIsActiveTeamLoading(false);
  }, [activeTeam?.id]);

  const clearAll = React.useCallback(() => {
    setOwnerDashboard(undefined);
    setActiveGame(undefined);
    setActiveTeam(undefined);
  }, []);

  React.useEffect(() => {
    if (auth.user) {
      refreshOwnerDashboard();
    }
  }, [auth.user, refreshOwnerDashboard]);

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

  return (
    <DataContext.Provider
      value={{
        ownerDashboard: {
          item: ownerDashboard,
          isLoading: isOwnerDashboardLoading,
          refresh: refreshOwnerDashboard,
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
