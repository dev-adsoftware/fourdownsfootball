import {BaseService} from './base-service';
import {
  TeamDetailQueryArgsDto,
  TeamDetailQueryResponseDto,
  TeamDto,
} from './dtos';

class Service extends BaseService {
  public async listTeams(
    queryStringParameters?: Record<string, unknown>,
  ): Promise<{items: TeamDto[]}> {
    return await this.list<TeamDto>('/teams', {
      queryStringParameters,
    });
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
