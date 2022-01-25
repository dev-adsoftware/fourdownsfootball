import {API} from 'aws-amplify';

export interface Town {
  id: string;
  stateId: string;
  name: string;
  latitude: number;
  longitude: number;
  population: number;
  timezone: string;
}

class Service {
  constructor() {}

  private mapApiToTown(input: any): Town {
    return {
      id: input.id,
      stateId: input.stateId,
      name: input.name,
      latitude: input.latitude,
      longitude: input.longitude,
      population: input.population,
      timezone: input.timezone,
    };
  }

  private mapTownToApi(input: Town): any {
    return {
      id: input.id,
      stateId: input.stateId,
      name: input.name,
      latitude: input.latitude,
      longitude: input.longitude,
      population: input.population,
      timezone: input.timezone,
    };
  }

  public async get(id: string): Promise<Town> {
    try {
      const result = await API.get('fourdowns', `/towns/${id}`, {});
      return this.mapApiToTown(result);
    } catch (e) {
      throw e;
    }
  }

  public async listByState(
    stateId: string,
    queryStringParameters?: Record<string, unknown>,
  ): Promise<{items: Town[]}> {
    try {
      const result = await API.get('fourdowns', `/states/${stateId}/towns`, {
        queryStringParameters,
      });
      return {
        items: result.items.map((item: any) => {
          return this.mapApiToTown(item);
        }),
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async create(body: Town): Promise<Town> {
    try {
      const result = await API.post('fourdowns', '/towns', {
        body: {
          ...this.mapTownToApi(body),
          sequence: '0',
          lastUpdateDate: new Date().toISOString(),
          lastUpdatedBy: 'system',
        },
      });
      return this.mapApiToTown(result);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async update(
    id: string,
    updateKeys: string[],
    updates: Record<string, unknown>,
  ): Promise<Town> {
    try {
      const result = await API.patch('fourdowns', `/towns/${id}`, {
        body: {
          ...updates,
          sequence: String(Number(updates.sequence) + 1),
        },
        queryStringParameters: {updateMask: updateKeys.join(',')},
      });
      return this.mapApiToTown(result);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

export {Service as TownsService};
