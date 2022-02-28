import {API} from 'aws-amplify';
import {Team, TeamsService} from './teams';

export interface Game {
  id: string;
  homeTeamId: string;
  homeTeam?: Team;
  awayTeamId: string;
  awayTeam?: Team;
  period: number;
  timeRemaining: number;
  ballOn: number;
  down: number;
  distance: number;
  offenseTeamId: string;
  actingTeamId: string;
  state: string;
  homeTeamScore: number;
  awayTeamScore: number;
}

export const createGameShell = (): Game => {
  return {
    id: '',
    homeTeamId: '',
    awayTeamId: '',
    period: 0,
    timeRemaining: 0,
    ballOn: 0,
    down: 0,
    distance: 0,
    offenseTeamId: '',
    actingTeamId: '',
    state: '',
    homeTeamScore: 0,
    awayTeamScore: 0,
  };
};

class Service {
  constructor() {}

  public mapApiToGame(input: any): Game {
    return {
      id: input.id,
      homeTeamId: input.homeTeamId,
      homeTeam: input.homeTeam
        ? new TeamsService().mapApiToTeam(input.homeTeam)
        : undefined,
      awayTeamId: input.awayTeamId,
      awayTeam: input.awayTeam
        ? new TeamsService().mapApiToTeam(input.awayTeam)
        : undefined,
      period: input.period,
      timeRemaining: input.timeRemaining,
      ballOn: input.ballOn,
      down: input.down,
      distance: input.distance,
      offenseTeamId: input.offenseTeamId,
      actingTeamId: input.actingTeamId,
      state: input.state,
      homeTeamScore: input.homeTeamScore,
      awayTeamScore: input.awayTeamScore,
    };
  }

  public mapGameToApi(input: Game): any {
    return {
      id: input.id,
      homeTeamId: input.homeTeamId,
      awayTeamId: input.awayTeamId,
      period: input.period,
      timeRemaining: input.timeRemaining,
      ballOn: input.ballOn,
      down: input.down,
      distance: input.distance,
      offenseTeamId: input.offenseTeamId,
      actingTeamId: input.actingTeamId,
      state: input.state,
      homeTeamScore: input.homeTeamScore,
      awayTeamScore: input.awayTeamScore,
    };
  }

  public async get(id: string): Promise<Game> {
    try {
      const result = await API.get('fourdowns', `/games/${id}`, {
        queryStringParameters: {
          detailType: 'full',
        },
      });
      return this.mapApiToGame(result);
    } catch (e) {
      throw e;
    }
  }

  public async list(
    queryStringParameters?: Record<string, unknown>,
  ): Promise<{items: Game[]}> {
    try {
      const result = await API.get('fourdowns', '/games', {
        queryStringParameters: {
          ...queryStringParameters,
          ...{detailType: 'full'},
        },
      });
      return {
        items: result.items.map((item: any) => {
          return this.mapApiToGame(item);
        }),
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async create(body: Game): Promise<Game> {
    try {
      const result = await API.post('fourdowns', '/games', {
        body: {
          sequence: '0',
          lastUpdateDate: new Date().toISOString(),
          lastUpdatedBy: 'system',
          ...this.mapGameToApi(body),
        },
        queryStringParameters: {
          detailType: 'full',
        },
      });
      return this.mapApiToGame(result);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async update(
    id: string,
    updateKeys: string[],
    updates: Record<string, unknown>,
  ): Promise<Game> {
    try {
      const result = await API.patch('fourdowns', `/games/${id}`, {
        body: {
          ...updates,
          sequence: String(Number(updates.sequence) + 1),
        },
        queryStringParameters: {
          updateMask: updateKeys.join(','),
          detailType: 'full',
        },
      });
      return this.mapApiToGame(result);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

export {Service as GamesService};
