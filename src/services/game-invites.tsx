import {API} from 'aws-amplify';

export interface GameInvite {
  id: string;
  ownerId: string;
  gameRequestId: string;
  status: string;
}

class Service {
  constructor() {}

  private mapApiToGameInvite(input: any): GameInvite {
    return {
      id: input.id,
      ownerId: input.ownerId,
      gameRequestId: input.gameRequestId,
      status: input.status,
    };
  }

  private mapGameInviteToApi(input: GameInvite): any {
    return {
      id: input.id,
      ownerId: input.ownerId,
      gameRequestId: input.gameRequestId,
      status: input.status,
    };
  }

  public async get(id: string): Promise<GameInvite> {
    try {
      const result = await API.get('fourdowns', `/game-invites/${id}`, {});
      return this.mapApiToGameInvite(result);
    } catch (e) {
      throw e;
    }
  }

  public async listByOwner(
    ownerId: string,
    queryStringParameters?: Record<string, unknown>,
  ): Promise<{items: GameInvite[]}> {
    try {
      const result = await API.get(
        'fourdowns',
        `/owners/${ownerId}/game-invites`,
        {
          queryStringParameters,
        },
      );
      return {
        items: result.items.map((item: any) => {
          return this.mapApiToGameInvite(item);
        }),
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async create(body: GameInvite): Promise<GameInvite> {
    console.log('POST /game-invites');
    try {
      const result = await API.post('fourdowns', '/game-invites', {
        body: {
          sequence: '0',
          lastUpdateDate: new Date().toISOString(),
          lastUpdatedBy: 'system',
          ...this.mapGameInviteToApi(body),
        },
      });
      return this.mapApiToGameInvite(result);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async update(
    id: string,
    updateKeys: string[],
    updates: Record<string, unknown>,
  ): Promise<GameInvite> {
    try {
      const result = await API.patch('fourdowns', `/game-invites/${id}`, {
        body: {
          ...updates,
          sequence: String(Number(updates.sequence) + 1),
        },
        queryStringParameters: {updateMask: updateKeys.join(',')},
      });
      return this.mapApiToGameInvite(result);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

export {Service as GameInvitesService};
