import {API} from 'aws-amplify';

export interface League {
  id: string;
  name: string;
  type: string;
}

class Service {
  constructor() {}

  public mapApiToLeague(input: any): League {
    return {
      id: input.id,
      name: input.name,
      type: input.type,
    };
  }

  public mapLeagueToApi(input: League): any {
    return {
      id: input.id,
      name: input.name,
      type: input.type,
    };
  }

  public async get(id: string): Promise<League> {
    try {
      const result = await API.get('fourdowns', `/leagues/${id}`, {});
      return this.mapApiToLeague(result);
    } catch (e) {
      throw e;
    }
  }

  public async create(body: League): Promise<League> {
    try {
      const result = await API.post('fourdowns', '/leagues', {
        body: {
          sequence: '0',
          lastUpdateDate: new Date().toISOString(),
          lastUpdatedBy: 'system',
          ...this.mapLeagueToApi(body),
        },
      });
      return this.mapApiToLeague(result);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async update(
    id: string,
    updateKeys: string[],
    updates: Record<string, unknown>,
  ): Promise<League> {
    try {
      const result = await API.patch('fourdowns', `/leagues/${id}`, {
        body: {
          ...updates,
          sequence: String(Number(updates.sequence) + 1),
        },
        queryStringParameters: {updateMask: updateKeys.join(',')},
      });
      return this.mapApiToLeague(result);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

export {Service as LeaguesService};
