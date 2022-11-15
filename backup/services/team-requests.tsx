import {BaseService} from './base-service';
import {TeamRequestDto} from './dtos';

class Service extends BaseService {
  constructor() {
    super();
  }

  public async createTeamRequest(
    teamRequest: TeamRequestDto,
  ): Promise<TeamRequestDto> {
    return await this.create<TeamRequestDto>('/team-requests', teamRequest);
  }
}

export {Service as TeamRequestsService};
