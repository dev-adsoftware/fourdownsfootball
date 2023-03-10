import {BaseService} from './base-service';
import {
  GameDetailQueryArgsDto,
  GameDetailQueryResponseDto,
  GameDto,
  GameRequestDto,
  GamesByOwnerQueryArgsDto,
  GamesByOwnerQueryResponseDto,
} from './dtos';
import {
  GamesByOwnerExtendedGameDto,
  GamesByOwnerExtendedGameRequestDto,
} from './dtos/queries/games-by-owner/games-by-owner-query-response.dto';

class Service extends BaseService {
  public async createGame(game: GameRequestDto): Promise<GameRequestDto> {
    return await this.create<GameRequestDto>('/game-requests', game);
  }

  public async queryGamesByOwner(
    args: GamesByOwnerQueryArgsDto,
  ): Promise<
    (GamesByOwnerExtendedGameRequestDto | GamesByOwnerExtendedGameDto)[]
  > {
    const pendingGames: (
      | GamesByOwnerExtendedGameRequestDto
      | GamesByOwnerExtendedGameDto
    )[] = [];
    const inProgressGames: (
      | GamesByOwnerExtendedGameRequestDto
      | GamesByOwnerExtendedGameDto
    )[] = [];

    let fetchResult = await this.get<GamesByOwnerQueryResponseDto>(
      '/queries/games-by-owner/:execute',
      {
        id: args.id,
      },
    );
    console.log(fetchResult);
    pendingGames.push(...fetchResult.pendingGames);
    inProgressGames.push(...fetchResult.inProgressGames);
    while (fetchResult.lastKey) {
      fetchResult = await this.get<GamesByOwnerQueryResponseDto>(
        '/queries/games-by-owner/:execute',
        {
          id: args.id,
          afterKey: fetchResult.lastKey,
        },
      );
      pendingGames.push(...fetchResult.pendingGames);
      inProgressGames.push(...fetchResult.inProgressGames);
    }
    return pendingGames.concat(inProgressGames);
  }

  public async queryGameDetail(
    args: GameDetailQueryArgsDto,
  ): Promise<GameDetailQueryResponseDto> {
    return await this.get<GameDetailQueryResponseDto>(
      '/queries/game-detail/:execute',
      {id: args.id},
    );
  }

  public async rsvpToGame(
    game: GameDto,
    teamId: string,
    acceptingOwnerId: string,
  ): Promise<void> {
    const gameRequestDto = await this.get<GameRequestDto>(
      `/game-requests/${game.id}`,
      {},
    );

    await this.update<GameRequestDto>(
      `/game-requests/${game.id}`,
      gameRequestDto,
      {
        invitedTeamId: teamId,
        lastUpdatedBy: acceptingOwnerId,
      },
      ['invitedTeamId', 'acceptingOwnerId'],
    );
  }
}

export {Service as GamesService};
