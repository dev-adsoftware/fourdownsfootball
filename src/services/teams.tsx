import {BaseService} from './base-service';
import {TeamDto} from './dtos';

class Service extends BaseService {
  public async listTeams(
    queryStringParameters?: Record<string, unknown>,
  ): Promise<{items: TeamDto[]}> {
    return await this.list<TeamDto>('/teams', {
      queryStringParameters,
    });
  }
}

export {Service as TeamsService};
