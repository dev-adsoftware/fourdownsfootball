import delay from 'delay';
import {BaseService} from './base-service';
import {
  GameDetailQueryArgsDto,
  GameDetailQueryResponseDto,
  GameDto,
  GamesByOwnerQueryArgsDto,
  GamesByOwnerQueryResponseDto,
} from './dtos';

class Service extends BaseService {
  public async createGame(game: GameDto): Promise<GameDto> {
    return await this.create<GameDto>('/games', game);
  }

  public async queryGamesByOwner(
    args: GamesByOwnerQueryArgsDto,
  ): Promise<GamesByOwnerQueryResponseDto> {
    let fetchResult = await this.get<GamesByOwnerQueryResponseDto>(
      '/queries/games-by-owner/:execute',
      {
        id: args.id,
      },
    );

    const returnResult = new GamesByOwnerQueryResponseDto();
    returnResult.games = [];
    while (fetchResult.lastKey) {
      returnResult.games.push(...fetchResult.games);
      fetchResult = await this.get<GamesByOwnerQueryResponseDto>(
        '/queries/games-by-owner/:execute',
        {
          id: args.id,
          afterKey: fetchResult.lastKey,
        },
      );
    }
    returnResult.games.push(...fetchResult.games);
    returnResult.lastKey = fetchResult.lastKey;
    return returnResult;
  }

  public async queryGameDetail(
    args: GameDetailQueryArgsDto,
  ): Promise<GameDetailQueryResponseDto> {
    return await this.get<GameDetailQueryResponseDto>(
      '/queries/game-detail/:execute',
      {id: args.id},
    );
  }

  public async waitForGameUpdate(
    id: string,
    sequence: string,
    maxDelay = 10000,
  ): Promise<void> {
    let game = await this.get<GameDto>(`/games/${id}`, {});
    let accumulatedDelay = 0;
    while (
      Number(game.sequence) < Number(sequence) &&
      accumulatedDelay < maxDelay
    ) {
      console.log(`delaying by 200, ${maxDelay - accumulatedDelay} left`);
      await delay(200);
      accumulatedDelay += 200;
      game = await this.get<GameDto>(`/games/${id}`, {});
    }
  }
}

export {Service as GamesService};
