import {API} from 'aws-amplify';
import {Town, TownsService} from './towns';

export interface Team {
  id: string;
  ownerId: string;
  nickname: string;
  primaryColor: string;
  town: Town;
}

class Service {
  constructor() {}

  private mapApiToTeam(input: any, town: Town): Team {
    return {
      id: input.id,
      ownerId: input.ownerId,
      nickname: input.nickname,
      primaryColor: input.primaryColor,
      town,
    };
  }

  private mapTeamToApi(input: Team): any {
    return {
      id: input.id,
      ownerId: input.ownerId,
      nickname: input.nickname,
      primaryColor: input.primaryColor,
    };
  }

  public async get(id: string): Promise<Team> {
    try {
      const result = await API.get('fourdowns', `/teams/${id}`, {});
      const town = await new TownsService().get(result.townId);
      return this.mapApiToTeam(result, town);
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
        queryStringParameters,
      });
      return {
        items: await Promise.all(
          result.items.map(async (item: any) => {
            const town = await new TownsService().get(item.townId);
            return this.mapApiToTeam(item, town);
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
      });
      const town = await new TownsService().get(result.townId);
      return this.mapApiToTeam(result, town);
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
        queryStringParameters: {updateMask: updateKeys.join(',')},
      });
      const town = await new TownsService().get(result.townId);
      return this.mapApiToTeam(result, town);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

export {Service as TeamsService};
