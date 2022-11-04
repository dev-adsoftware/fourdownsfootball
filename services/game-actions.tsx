import {BaseService} from './base-service';
import {GameActionDto} from './dtos';
class Service extends BaseService {
  constructor() {
    super();
  }

  public async createGameAction(
    gameAction: GameActionDto,
  ): Promise<GameActionDto> {
    return await this.create<GameActionDto>('/game-actions', gameAction);
  }
}

export {Service as GameActionsService};
