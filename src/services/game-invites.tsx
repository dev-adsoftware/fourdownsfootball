import {API} from 'aws-amplify';
import {GameRequest, GameRequestsService} from './game-requests';
import {Owner, OwnersService} from './owners';
import {Team, TeamsService} from './teams';

export interface GameInvite {
  id: string;
  sequence: string;
  ownerId: string;
  owner?: Owner;
  gameRequestId: string;
  gameRequest?: GameRequest;
  teamId: string;
  team?: Team;
  status: string;
}

class Service {
  constructor() {}

  public mapApiToGameInvite(input: any): GameInvite {
    return {
      id: input.id,
      sequence: input.sequence,
      ownerId: input.ownerId,
      owner: input.owner
        ? new OwnersService().mapApiToOwner(input.owner)
        : undefined,
      gameRequestId: input.gameRequestId,
      gameRequest: input.gameRequest
        ? new GameRequestsService().mapApiToGameRequest(input.gameRequest)
        : undefined,
      teamId: input.teamId,
      team: input.team
        ? new TeamsService().mapApiToTeam(input.team)
        : undefined,
      status: input.status,
    };
  }

  public mapGameInviteToApi(input: GameInvite): any {
    return {
      id: input.id,
      sequence: input.sequence,
      ownerId: input.ownerId,
      gameRequestId: input.gameRequestId,
      teamId: input.teamId,
      status: input.status,
    };
  }

  public async get(id: string): Promise<GameInvite> {
    try {
      const result = await API.get('fourdowns', `/game-invites/${id}`, {
        queryStringParameters: {detailType: 'full'},
      });
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
          queryStringParameters: {
            ...queryStringParameters,
            ...{detailType: 'full'},
          },
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
        queryStringParameters: {
          detailType: 'full',
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
        queryStringParameters: {
          updateMask: updateKeys.join(','),
          detailType: 'full',
        },
      });
      return this.mapApiToGameInvite(result);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

export {Service as GameInvitesService};
