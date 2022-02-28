import {API} from 'aws-amplify';

export interface DeviceRegistration {
  id: string;
  sequence: string;
  ownerId: string;
  token: string;
}

class Service {
  constructor() {}

  public mapApiToDeviceRegistration(input: any): DeviceRegistration {
    return {
      id: input.id,
      sequence: input.sequence,
      ownerId: input.ownerId,
      token: input.token,
    };
  }

  public mapDeviceRegistrationToApi(input: DeviceRegistration): any {
    return {
      id: input.id,
      sequence: input.sequence,
      ownerId: input.ownerId,
      token: input.token,
    };
  }

  public async get(id: string): Promise<DeviceRegistration> {
    try {
      const result = await API.get(
        'fourdowns',
        `/device-registrations/${id}`,
        {},
      );
      return this.mapApiToDeviceRegistration(result);
    } catch (e) {
      throw e;
    }
  }

  public async listByOwner(
    ownerId: string,
    queryStringParameters?: Record<string, unknown>,
  ): Promise<{items: DeviceRegistration[]}> {
    try {
      const result = await API.get(
        'fourdowns',
        `/owners/${ownerId}/device-registrations`,
        {
          queryStringParameters,
        },
      );
      return {
        items: result.items.map((item: any) => {
          return this.mapApiToDeviceRegistration(item);
        }),
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async create(body: DeviceRegistration): Promise<DeviceRegistration> {
    console.log('POST /device-registrations');
    try {
      const result = await API.post('fourdowns', '/device-registrations', {
        body: {
          sequence: '0',
          lastUpdateDate: new Date().toISOString(),
          lastUpdatedBy: 'system',
          ...this.mapDeviceRegistrationToApi(body),
        },
      });
      return this.mapApiToDeviceRegistration(result);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async update(
    id: string,
    updateKeys: string[],
    updates: Record<string, unknown>,
  ): Promise<DeviceRegistration> {
    try {
      const result = await API.patch(
        'fourdowns',
        `/device-registrations/${id}`,
        {
          body: {
            lastUpdateDate: new Date().toISOString(),
            lastUpdatedBy: 'system',
            ...updates,
            sequence: String(Number(updates.sequence) + 1),
          },
          queryStringParameters: {updateMask: updateKeys.join(',')},
        },
      );
      return this.mapApiToDeviceRegistration(result);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

export {Service as DeviceRegistrationsService};
