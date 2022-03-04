import {BaseService} from './base-service';
import {NationDto} from './dtos';

class Service extends BaseService {
  constructor() {
    super();
  }

  public async listNations(
    queryStringParameters?: Record<string, unknown>,
  ): Promise<{items: NationDto[]}> {
    return await this.list('/nations', {
      queryStringParameters,
    });
  }
}

export {Service as NationsService};
