import {API} from 'aws-amplify';
import {Team, TeamsService} from './teams';

export interface GameRequest {
  id: string;
  ownerId: string;
  teamId: string;
  team?: Team;
  invitedOwnerId: string;
  status: string;
}

class Service {
  constructor() {}

  public mapApiToGameRequest(input: any): GameRequest {
    return {
      id: input.id,
      ownerId: input.ownerId,
      teamId: input.teamId,
      team: input.team
        ? new TeamsService().mapApiToTeam(input.team)
        : undefined,
      invitedOwnerId: input.invitedOwnerId,
      status: input.status,
    };
  }

  public mapGameRequestToApi(input: GameRequest): any {
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
      const result = await API.get('fourdowns', `/game-requests/${id}`, {
        queryStringParameters: {detailType: 'full'},
      });
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
          queryStringParameters: {
            ...queryStringParameters,
            ...{detailType: 'full'},
          },
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
        queryStringParameters: {
          detailType: 'full',
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
        queryStringParameters: {
          updateMask: updateKeys.join(','),
          detailType: 'full',
        },
      });
      return this.mapApiToGameRequest(result);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

export {Service as GameRequestsService};
