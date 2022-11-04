import {BaseService} from './base-service';
import {TownDto} from './dtos';

class Service extends BaseService {
  constructor() {
    super();
  }

  public async listByState(
    stateId: string,
    queryStringParameters?: Record<string, unknown>,
  ): Promise<{items: TownDto[]}> {
    return await this.list<TownDto>(`/states/${stateId}/towns`, {
      queryStringParameters,
    });
  }
}

export {Service as TownsService};
