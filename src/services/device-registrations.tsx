import {BaseService} from './base-service';
import {DeviceRegistrationDto} from './dtos';
class Service extends BaseService {
  public async deviceRegistrationExists(id: string): Promise<boolean> {
    try {
      await this.get(`/device-registrations/${id}`, {});
      return true;
    } catch (e) {
      if (this.getStatusFromError(e) === 404) {
        return false;
      }
      throw e;
    }
  }

  public async getDeviceRegistration(
    id: string,
  ): Promise<DeviceRegistrationDto> {
    return await this.get<DeviceRegistrationDto>(
      `/device-registrations/${id}`,
      {},
    );
  }

  public async listByOwner(
    ownerId: string,
    queryStringParameters?: Record<string, unknown>,
  ): Promise<{items: DeviceRegistrationDto[]}> {
    return await this.list<DeviceRegistrationDto>(
      `/owners/${ownerId}/device-registrations`,
      {
        queryStringParameters,
      },
    );
  }

  public async createDeviceRegistration(
    deviceRegistration: DeviceRegistrationDto,
  ): Promise<DeviceRegistrationDto> {
    return await this.create<DeviceRegistrationDto>(
      '/device-registrations',
      deviceRegistration,
    );
  }

  public async updateDeviceRegistration(
    id: string,
    currentDeviceRegistration: DeviceRegistrationDto,
    updates: Record<string, unknown>,
    updateKeys: string[],
  ): Promise<DeviceRegistrationDto> {
    return await this.update<DeviceRegistrationDto>(
      `/device-registrations/${id}`,
      currentDeviceRegistration,
      updates,
      updateKeys,
    );
  }
}

export {Service as DeviceRegistrationsService};
