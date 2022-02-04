import {API} from 'aws-amplify';

export interface Player {
  id: string;
  teamId: string;
  firstName: string;
  lastName: string;
  position: string;
  depthChartSlot: number;
  jerseyNumber: number;
}

class Service {
  constructor() {}

  private mapApiToPlayer(input: any): Player {
    return {
      id: input.id,
      teamId: input.teamId,
      firstName: input.firstName,
      lastName: input.lastName,
      position: input.position,
      depthChartSlot: input.depthChartSlot,
      jerseyNumber: input.jerseyNumber,
    };
  }

  private mapPlayerToApi(input: Player): any {
    return {
      id: input.id,
      teamId: input.teamId,
      firstName: input.firstName,
      lastName: input.lastName,
      position: input.position,
      depthChartSlot: input.depthChartSlot,
      jerseyNumber: input.jerseyNumber,
    };
  }

  public async get(id: string): Promise<Player> {
    try {
      const result = await API.get('fourdowns', `/players/${id}`, {});
      return this.mapApiToPlayer(result);
    } catch (e) {
      throw e;
    }
  }

  public async listByTeam(
    teamId: string,
    queryStringParameters?: Record<string, unknown>,
  ): Promise<{items: Player[]}> {
    try {
      const result = await API.get('fourdowns', `/teams/${teamId}/players`, {
        queryStringParameters,
      });
      return {
        items: await Promise.all(
          result.items.map(async (item: any) => {
            return this.mapApiToPlayer(item);
          }),
        ),
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async create(body: Player): Promise<Player> {
    try {
      const result = await API.post('fourdowns', '/players', {
        body: {
          sequence: '0',
          lastUpdateDate: new Date().toISOString(),
          lastUpdatedBy: 'system',
          ...this.mapPlayerToApi(body),
        },
      });
      return this.mapApiToPlayer(result);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async update(
    id: string,
    updateKeys: string[],
    updates: Record<string, unknown>,
  ): Promise<Player> {
    try {
      const result = await API.patch('fourdowns', `/players/${id}`, {
        body: {
          ...updates,
          sequence: String(Number(updates.sequence) + 1),
        },
        queryStringParameters: {updateMask: updateKeys.join(',')},
      });
      return this.mapApiToPlayer(result);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

export {Service as PlayersService};
