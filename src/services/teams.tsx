import {API} from 'aws-amplify';
import {League, LeaguesService} from './leagues';
import {Town, TownsService} from './towns';

export interface Team {
  id: string;
  ownerId: string;
  leagueId: string;
  nickname: string;
  primaryColor: string;
  townId: string;
  town: Town;
  name: string;
  league?: League;
}

class Service {
  constructor() {}

  public mapApiToTeam(input: any): Team {
    return {
      id: input.id,
      ownerId: input.ownerId,
      leagueId: input.leagueId,
      nickname: input.nickname,
      primaryColor: input.primaryColor,
      townId: input.townId,
      town: new TownsService().mapApiToTown(input.town),
      name: `${input.town.name} ${input.nickname}`,
      league: new LeaguesService().mapApiToLeague(input.league),
    };
  }

  public mapTeamToApi(input: Team): any {
    return {
      id: input.id,
      ownerId: input.ownerId,
      leagueId: input.leagueId,
      townId: input.townId,
      nickname: input.nickname,
      primaryColor: input.primaryColor,
    };
  }

  public async get(id: string): Promise<Team> {
    try {
      const result = await API.get('fourdowns', `/teams/${id}`, {
        queryStringParameters: {detailType: 'full'},
      });
      return this.mapApiToTeam(result);
    } catch (e) {
      throw e;
    }
  }

  public async listByOwner(
    ownerId: string,
    queryStringParameters?: Record<string, unknown>,
  ): Promise<{items: Team[]}> {
    try {
      const result = await API.get('fourdowns', `/owners/${ownerId}/teams`, {
        queryStringParameters: {
          ...queryStringParameters,
          ...{detailType: 'full'},
        },
      });
      return {
        items: await Promise.all(
          result.items.map(async (item: any) => {
            return this.mapApiToTeam(item);
          }),
        ),
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async create(body: Team): Promise<Team> {
    try {
      const result = await API.post('fourdowns', '/teams', {
        body: {
          sequence: '0',
          lastUpdateDate: new Date().toISOString(),
          lastUpdatedBy: 'system',
          ...this.mapTeamToApi(body),
        },
        queryStringParameters: {
          detailType: 'full',
        },
      });
      return this.mapApiToTeam(result);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async update(
    id: string,
    updateKeys: string[],
    updates: Record<string, unknown>,
  ): Promise<Team> {
    try {
      const result = await API.patch('fourdowns', `/teams/${id}`, {
        body: {
          ...updates,
          sequence: String(Number(updates.sequence) + 1),
        },
        queryStringParameters: {
          updateMask: updateKeys.join(','),
          detailType: 'full',
        },
      });
      return this.mapApiToTeam(result);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

export {Service as TeamsService};
