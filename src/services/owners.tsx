import {BaseService} from './base-service';
import {
  OwnerDashboardQueryArgsDto,
  OwnerDashboardQueryResponseDto,
  OwnerDto,
} from './dtos';

class Service extends BaseService {
  constructor() {
    super();
  }

  public async ownerExists(id: string): Promise<boolean> {
    try {
      await this.get<OwnerDto>(`/owners/${id}`, {});
      return true;
    } catch (e) {
      if (this.getStatusFromError(e) === 404) {
        return false;
      }
      throw e;
    }
  }

  public async queryOwnerDashboard(
    args: OwnerDashboardQueryArgsDto,
  ): Promise<OwnerDashboardQueryResponseDto> {
    return await this.get<OwnerDashboardQueryResponseDto>(
      '/queries/owner-dashboard/:execute',
      {
        id: args.id,
      },
    );
  }

  public async listOwners(
    queryStringParameters?: Record<string, unknown>,
  ): Promise<{items: OwnerDto[]}> {
    return await this.list<OwnerDto>('/owners', {
      queryStringParameters,
    });
  }

  public async createOwner(owner: OwnerDto): Promise<OwnerDto> {
    return await this.create<OwnerDto>('/owners', owner);
  }
}

export {Service as OwnersService};
