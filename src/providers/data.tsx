import moment from 'moment';
import React from 'react';
import {GameInvite, GameInvitesService} from '../services/game-invites';
import {
  GameParticipant,
  GameParticipantsService,
} from '../services/game-participants';
import {GameRequest, GameRequestsService} from '../services/game-requests';
import {createGameShell, Game, GamesService} from '../services/games';
import {Notification, NotificationsService} from '../services/notifications';
import {TeamRequest, TeamRequestsService} from '../services/team-requests';
import {Team, TeamsService} from '../services/teams';
import {useAuth} from './auth';

const DataContext = React.createContext<Data | undefined>(undefined);

export interface DataSetSegment<T> {
  items: T[];
  isLoading: boolean;
  refresh: () => Promise<void>;
}

export interface DataItemSegment<T> {
  item: T;
  isLoading: boolean;
  set: (item: T) => void;
  refresh: () => Promise<void>;
}

interface Data {
  teams: DataSetSegment<Team>;
  teamRequests: DataSetSegment<TeamRequest>;
  gameRequests: DataSetSegment<GameRequest>;
  gameInvites: DataSetSegment<GameInvite>;
  gameParticipants: DataSetSegment<GameParticipant>;
  activeGame: DataItemSegment<Game>;
  notifications: DataSetSegment<Notification>;
  clearAll: () => void;
}

type Properties = {
  children: React.ReactNode;
};

const DataProvider: React.FC<Properties> = ({children}) => {
  const [teams, setTeams] = React.useState<Team[]>([]);
  const [isTeamsLoading, setIsTeamsLoading] = React.useState(true);

  const [teamRequests, setTeamRequests] = React.useState<TeamRequest[]>([]);
  const [isTeamRequestsLoading, setIsTeamRequestsLoading] =
    React.useState(true);

  const [gameRequests, setGameRequests] = React.useState<GameRequest[]>([]);
  const [isGameRequestsLoading, setIsGameRequestsLoading] =
    React.useState(true);

  const [gameInvites, setGameInvites] = React.useState<GameInvite[]>([]);
  const [isGameInvitesLoading, setIsGameInvitesLoading] = React.useState(true);

  const [gameParticipants, setGameParticipants] = React.useState<
    GameParticipant[]
  >([]);
  const [isGameParticipantsLoading, setIsGameParticipantsLoading] =
    React.useState(true);

  const [activeGame, setActiveGame] = React.useState<Game>();
  const [isActiveGameLoading, setIsActiveGameLoading] = React.useState(true);

  const [notifications, setNotifications] = React.useState<Notification[]>([]);
  const [isNotificationsLoading, setIsNotificationsLoading] =
    React.useState(true);

  const auth = useAuth();

  const refreshTeams = React.useCallback(async () => {
    setIsTeamsLoading(true);
    const teamsService = new TeamsService();
    setTeams((await teamsService.listByOwner(auth.owner?.id as string)).items);
    setIsTeamsLoading(false);
  }, [auth.owner?.id]);

  const refreshTeamRequests = React.useCallback(async () => {
    setIsTeamRequestsLoading(true);
    const teamRequestsService = new TeamRequestsService();
    setTeamRequests(
      (
        await teamRequestsService.listByOwner(auth.owner?.id as string)
      ).items.filter((teamRequest: TeamRequest) => {
        return teamRequest.status !== 'Complete';
      }),
    );
    setIsTeamRequestsLoading(false);
  }, [auth.owner?.id]);

  const refreshGameRequests = React.useCallback(async () => {
    setIsGameRequestsLoading(true);
    const gameRequestsService = new GameRequestsService();
    setGameRequests(
      (
        await gameRequestsService.listByOwner(auth.owner?.id as string)
      ).items.filter((item: GameRequest) => {
        return item.status !== 'Accepted';
      }),
    );
    setIsGameRequestsLoading(false);
  }, [auth.owner?.id]);

  const refreshGameInvites = React.useCallback(async () => {
    setIsGameInvitesLoading(true);
    const gameInvitesService = new GameInvitesService();
    setGameInvites(
      (
        await gameInvitesService.listByOwner(auth.owner?.id as string)
      ).items.filter((item: GameInvite) => {
        return item.status !== 'Accepted';
      }),
    );
    setIsGameInvitesLoading(false);
  }, [auth.owner?.id]);

  const refreshGameParticipants = React.useCallback(async () => {
    setIsGameParticipantsLoading(true);
    const gameParticipantsService = new GameParticipantsService();
    setGameParticipants(
      (await gameParticipantsService.listByOwner(auth.owner?.id as string))
        .items,
    );
    setIsGameParticipantsLoading(false);
  }, [auth.owner?.id]);

  const refreshActiveGame = React.useCallback(async () => {
    if (!activeGame?.id) {
      return;
    }

    setIsActiveGameLoading(true);
    const gamesService = new GamesService();
    setActiveGame(await gamesService.get(activeGame?.id as string));
    setIsActiveGameLoading(false);
  }, [activeGame?.id]);

  const refreshNotifications = React.useCallback(async () => {
    setIsNotificationsLoading(true);
    const notificationsService = new NotificationsService();
    setNotifications(
      (
        await notificationsService.listByOwner(auth.owner?.id as string, {
          asOf: moment().subtract(7, 'days').toISOString(),
        })
      ).items,
    );
    setIsNotificationsLoading(false);
  }, [auth.owner?.id]);

  const clearAll = React.useCallback(() => {
    setTeams([]);
    setTeamRequests([]);
    setGameRequests([]);
    setGameInvites([]);
    setGameParticipants([]);
    setActiveGame(undefined);
    setNotifications([]);
  }, []);

  React.useEffect(() => {
    if (auth.owner) {
      refreshTeams();
      refreshTeamRequests();
      refreshGameRequests();
      refreshGameInvites();
      refreshGameParticipants();
      refreshActiveGame();
      refreshNotifications();
    }
  }, [
    auth.owner,
    refreshTeams,
    refreshTeamRequests,
    refreshGameRequests,
    refreshGameInvites,
    refreshGameParticipants,
    refreshActiveGame,
    refreshNotifications,
  ]);

  return (
    <DataContext.Provider
      value={{
        teams: {
          items: teams,
          isLoading: isTeamsLoading,
          refresh: refreshTeams,
        },
        teamRequests: {
          items: teamRequests,
          isLoading: isTeamRequestsLoading,
          refresh: refreshTeamRequests,
        },
        gameRequests: {
          items: gameRequests,
          isLoading: isGameRequestsLoading,
          refresh: refreshGameRequests,
        },
        gameInvites: {
          items: gameInvites,
          isLoading: isGameInvitesLoading,
          refresh: refreshGameInvites,
        },
        gameParticipants: {
          items: gameParticipants,
          isLoading: isGameParticipantsLoading,
          refresh: refreshGameParticipants,
        },

        activeGame: {
          item: activeGame || createGameShell(),
          isLoading: isActiveGameLoading,
          set: setActiveGame,
          refresh: refreshActiveGame,
        },
        notifications: {
          items: notifications,
          isLoading: isNotificationsLoading,
          refresh: refreshNotifications,
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
