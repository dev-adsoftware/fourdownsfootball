import {BaseService} from './base-service';
import {TeamDetailQueryArgsDto, TeamDetailQueryResponseDto} from './dtos';

class Service extends BaseService {
  constructor() {
    super();
  }

  public async queryTeamDetail(
    args: TeamDetailQueryArgsDto,
  ): Promise<TeamDetailQueryResponseDto> {
    return await this.get<TeamDetailQueryResponseDto>(
      '/queries/team-detail/:execute',
      {id: args.id},
    );
  }
}

export {Service as TeamsService};
