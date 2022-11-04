import {BaseService} from './base-service';
import {GameInviteDto} from './dtos';

class Service extends BaseService {
  constructor() {
    super();
  }

  public async updateGameInvite(
    id: string,
    currentGameInvite: GameInviteDto,
    updates: Record<string, unknown>,
    updateKeys: string[],
  ): Promise<GameInviteDto> {
    return await this.update(
      `/game-invites/${id}`,
      currentGameInvite,
      updates,
      updateKeys,
    );
  }
}

export {Service as GameInvitesService};
