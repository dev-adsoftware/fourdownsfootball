import React from 'react';
import {GameInvite, GameInvitesService} from '../services/game-invites';
import {GameRequest, GameRequestsService} from '../services/game-requests';
import {Team, TeamsService} from '../services/teams';
import {useAuth} from './auth';

const DataContext = React.createContext<Data | undefined>(undefined);

type DataSegment<T> = {
  items: T[];
  isLoading: boolean;
};

type DataSegmentWithRefresh<T> = {
  data: DataSegment<T>;
  refresh: () => Promise<void>;
};
interface Data {
  teams: DataSegmentWithRefresh<Team>;
  gameRequests: DataSegmentWithRefresh<GameRequest>;
  gameInvites: DataSegmentWithRefresh<GameInvite>;
  clearAll: () => void;
}

type Properties = {
  children: React.ReactNode;
};

const DataProvider: React.FC<Properties> = ({children}) => {
  const [teams, setTeams] = React.useState<Team[]>([]);
  const [isTeamsLoading, setIsTeamsLoading] = React.useState(true);

  const [gameRequests, setGameRequests] = React.useState<GameRequest[]>([]);
  const [isGameRequestsLoading, setIsGameRequestsLoading] =
    React.useState(true);

  const [gameInvites, setGameInvites] = React.useState<GameInvite[]>([]);
  const [isGameInvitesLoading, setIsGameInvitesLoading] = React.useState(true);

  const auth = useAuth();

  const refreshTeams = React.useCallback(async () => {
    setIsTeamsLoading(true);
    const teamsService = new TeamsService();
    setTeams((await teamsService.listByOwner(auth.owner?.id as string)).items);
    setIsTeamsLoading(false);
  }, [auth.owner?.id]);

  const refreshGameRequests = React.useCallback(async () => {
    setIsGameRequestsLoading(true);
    const gameRequestsService = new GameRequestsService();
    setGameRequests(
      (await gameRequestsService.listByOwner(auth.owner?.id as string)).items,
    );
    setIsGameRequestsLoading(false);
  }, [auth.owner?.id]);

  const refreshGameInvites = React.useCallback(async () => {
    setIsGameInvitesLoading(true);
    const gameInvitesService = new GameInvitesService();
    setGameInvites(
      (await gameInvitesService.listByOwner(auth.owner?.id as string)).items,
    );
    setIsGameInvitesLoading(false);
  }, [auth.owner?.id]);

  const clearAll = React.useCallback(() => {
    setTeams([]);
    setGameRequests([]);
    setGameInvites([]);
  }, []);

  React.useEffect(() => {
    if (auth.owner) {
      refreshTeams();
      refreshGameRequests();
      refreshGameInvites();
    }
  }, [auth.owner, refreshTeams, refreshGameRequests, refreshGameInvites]);

  return (
    <DataContext.Provider
      value={{
        teams: {
          data: {items: teams, isLoading: isTeamsLoading},
          refresh: refreshTeams,
        },
        gameRequests: {
          data: {items: gameRequests, isLoading: isGameRequestsLoading},
          refresh: refreshGameRequests,
        },
        gameInvites: {
          data: {items: gameInvites, isLoading: isGameInvitesLoading},
          refresh: refreshGameInvites,
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
