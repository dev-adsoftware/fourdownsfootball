import {API} from 'aws-amplify';

export interface GameRequest {
  id: string;
  ownerId: string;
  teamId: string;
  invitedOwnerId: string;
  status: string;
}

class Service {
  constructor() {}

  private mapApiToGameRequest(input: any): GameRequest {
    return {
      id: input.id,
      ownerId: input.ownerId,
      teamId: input.teamId,
      invitedOwnerId: input.invitedOwnerId,
      status: input.status,
    };
  }

  private mapGameRequestToApi(input: GameRequest): any {
    return {
      id: input.id,
      ownerId: input.ownerId,
      teamId: input.teamId,
      invitedOwnerId: input.invitedOwnerId,
      status: input.status,
    };
  }

  public async get(id: string): Promise<GameRequest> {
    try {
      const result = await API.get('fourdowns', `/game-requests/${id}`, {});
      return this.mapApiToGameRequest(result);
    } catch (e) {
      throw e;
    }
  }

  public async listByOwner(
    ownerId: string,
    queryStringParameters?: Record<string, unknown>,
  ): Promise<{items: GameRequest[]}> {
    try {
      const result = await API.get(
        'fourdowns',
        `/owners/${ownerId}/game-requests`,
        {
          queryStringParameters,
        },
      );
      return {
        items: result.items.map((item: any) => {
          return this.mapApiToGameRequest(item);
        }),
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async create(body: GameRequest): Promise<GameRequest> {
    console.log('POST /game-requests');
    try {
      const result = await API.post('fourdowns', '/game-requests', {
        body: {
          sequence: '0',
          lastUpdateDate: new Date().toISOString(),
          lastUpdatedBy: 'system',
          ...this.mapGameRequestToApi(body),
        },
      });
      return this.mapApiToGameRequest(result);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async update(
    id: string,
    updateKeys: string[],
    updates: Record<string, unknown>,
  ): Promise<GameRequest> {
    try {
      const result = await API.patch('fourdowns', `/game-requests/${id}`, {
        body: {
          ...updates,
          sequence: String(Number(updates.sequence) + 1),
        },
        queryStringParameters: {updateMask: updateKeys.join(',')},
      });
      return this.mapApiToGameRequest(result);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

export {Service as GameRequestsService};
