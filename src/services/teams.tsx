import {API} from 'aws-amplify';

export interface Team {
  id: string;
  ownerId: string;
  nickname: string;
}

class Service {
  constructor() {}

  private mapApiToTeam(input: any): Team {
    return {id: input.id, ownerId: input.ownerId, nickname: input.nickname};
  }

  private mapTeamToApi(input: Team): any {
    return {id: input.id, ownerId: input.ownerId, nickname: input.nickname};
  }

  public async get(id: string): Promise<Team> {
    try {
      const result = await API.get('fourdowns', `/teams/${id}`, {});
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
        queryStringParameters,
      });
      return {
        items: result.items.map((item: any) => {
          return this.mapApiToTeam(item);
        }),
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
          ...this.mapTeamToApi(body),
          sequence: '0',
          lastUpdateDate: new Date().toISOString(),
          lastUpdatedBy: 'system',
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
        queryStringParameters: {updateMask: updateKeys.join(',')},
      });
      return this.mapApiToTeam(result);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

export {Service as TeamsService};
