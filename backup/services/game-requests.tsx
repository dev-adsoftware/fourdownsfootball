import {BaseService} from './base-service';
import {GameRequestDto} from './dtos';

class Service extends BaseService {
  constructor() {
    super();
  }

  public async createGameRequest(
    gameRequest: GameRequestDto,
  ): Promise<GameRequestDto> {
    return await this.create<GameRequestDto>('/game-requests', gameRequest);
  }
}

export {Service as GameRequestsService};
