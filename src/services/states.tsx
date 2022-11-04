import {BaseService} from './base-service';
import {StateDto} from './dtos';

class Service extends BaseService {
  constructor() {
    super();
  }

  public async listByNation(
    nationId: string,
    queryStringParameters?: Record<string, unknown>,
  ): Promise<{items: StateDto[]}> {
    return await this.list<StateDto>(`/nations/${nationId}/states`, {
      queryStringParameters,
    });
  }
}

export {Service as StatesService};
