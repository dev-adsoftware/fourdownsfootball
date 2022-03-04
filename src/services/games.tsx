import {BaseService} from './base-service';
import {GameDetailQueryArgsDto, GameDetailQueryResponseDto} from './dtos';

class Service extends BaseService {
  constructor() {
    super();
  }

  public async queryGameDetail(
    args: GameDetailQueryArgsDto,
  ): Promise<GameDetailQueryResponseDto> {
    return await this.get<GameDetailQueryResponseDto>(
      '/queries/game-detail/:execute',
      {id: args.id},
    );
  }
}

export {Service as GamesService};
