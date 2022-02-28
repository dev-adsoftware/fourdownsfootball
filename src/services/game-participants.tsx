import {API} from 'aws-amplify';
import {Game, GamesService} from './games';
import {Owner, OwnersService} from './owners';
import {Team, TeamsService} from './teams';

export interface GameParticipant {
  id: string;
  ownerId: string;
  owner?: Owner;
  gameId: string;
  game?: Game;
  teamId: string;
  team?: Team;
  homeAway: boolean;
}

class Service {
  constructor() {}

  public mapApiToGameParticipant(input: any): GameParticipant {
    return {
      id: input.id,
      ownerId: input.ownerId,
      owner: input.owner
        ? new OwnersService().mapApiToOwner(input.owner)
        : undefined,
      gameId: input.gameId,
      game: input.game
        ? new GamesService().mapApiToGame(input.game)
        : undefined,
      teamId: input.teamId,
      team: input.team
        ? new TeamsService().mapApiToTeam(input.team)
        : undefined,
      homeAway: input.homeAway,
    };
  }

  public mapGameParticipantToApi(input: GameParticipant): any {
    return {
      id: input.id,
      ownerId: input.ownerId,
      gameId: input.gameId,
      teamId: input.teamId,
      homeAway: input.homeAway,
    };
  }

  public async get(id: string): Promise<GameParticipant> {
    try {
      const result = await API.get('fourdowns', `/game-participants/${id}`, {
        queryStringParameters: {
          detailType: 'full',
        },
      });
      return this.mapApiToGameParticipant(result);
    } catch (e) {
      throw e;
    }
  }

  public async listByOwner(
    ownerId: string,
    queryStringParameters?: Record<string, unknown>,
  ): Promise<{items: GameParticipant[]}> {
    try {
      const result = await API.get(
        'fourdowns',
        `/owners/${ownerId}/game-participants`,
        {
          queryStringParameters: {
            ...queryStringParameters,
            ...{detailType: 'full'},
          },
        },
      );
      return {
        items: await Promise.all(
          result.items.map(async (item: any) => {
            return this.mapApiToGameParticipant(item);
          }),
        ),
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  // public async listByTeam(
  //   teamId: string,
  //   queryStringParameters?: Record<string, unknown>,
  // ): Promise<{items: GameParticipant[]}> {
  //   try {
  //     const result = await API.get(
  //       'fourdowns',
  //       `/teams/${teamId}/game-participants`,
  //       {
  //         queryStringParameters,
  //       },
  //     );
  //     return {
  //       items: result.items.map((item: any) => {
  //         return this.mapApiToGameParticipant(item);
  //       }),
  //     };
  //   } catch (e) {
  //     console.log(e);
  //     throw e;
  //   }
  // }

  // public async listByGame(
  //   gameId: string,
  //   queryStringParameters?: Record<string, unknown>,
  // ): Promise<{items: GameParticipant[]}> {
  //   try {
  //     const result = await API.get(
  //       'fourdowns',
  //       `/games/${gameId}/game-participants`,
  //       {
  //         queryStringParameters,
  //       },
  //     );
  //     return {
  //       items: result.items.map((item: any) => {
  //         return this.mapApiToGameParticipant(item);
  //       }),
  //     };
  //   } catch (e) {
  //     console.log(e);
  //     throw e;
  //   }
  // }

  public async create(body: GameParticipant): Promise<GameParticipant> {
    console.log('POST /game-participants');
    try {
      const result = await API.post('fourdowns', '/game-participants', {
        body: {
          sequence: '0',
          lastUpdateDate: new Date().toISOString(),
          lastUpdatedBy: 'system',
          ...this.mapGameParticipantToApi(body),
        },
        queryStringParameters: {
          detailType: 'full',
        },
      });
      return this.mapApiToGameParticipant(result);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async update(
    id: string,
    updateKeys: string[],
    updates: Record<string, unknown>,
  ): Promise<GameParticipant> {
    try {
      const result = await API.patch('fourdowns', `/game-participants/${id}`, {
        body: {
          ...updates,
          sequence: String(Number(updates.sequence) + 1),
        },
        queryStringParameters: {
          updateMask: updateKeys.join(','),
          detailType: 'full',
        },
      });
      return this.mapApiToGameParticipant(result);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

export {Service as GameParticipantsService};
