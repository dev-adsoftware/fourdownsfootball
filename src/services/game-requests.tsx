import {BaseService} from './base-service';
import {
  GameRequestDto,
  GameRequestsByOwnerQueryArgsDto,
  GameRequestsByOwnerQueryResponseDto,
} from './dtos';

class Service extends BaseService {
  public async createGameRequest(
    gameRequest: GameRequestDto,
  ): Promise<GameRequestDto> {
    return await this.create<GameRequestDto>('/game-requests', gameRequest);
  }

  public async queryGameRequestsByOwner(
    args: GameRequestsByOwnerQueryArgsDto,
  ): Promise<GameRequestsByOwnerQueryResponseDto> {
    return await this.get<GameRequestsByOwnerQueryResponseDto>(
      '/queries/game-requests-by-owner/:execute',
      {
        id: args.id,
      },
    );
  }
}

export {Service as GameRequestsService};
