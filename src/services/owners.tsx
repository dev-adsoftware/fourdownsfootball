import {API} from 'aws-amplify';

export interface Owner {
  id: string;
  name: string;
  email: string;
}

class Service {
  constructor() {}

  private mapApiToOwner(input: any): Owner {
    return {id: input.id, name: input.name, email: input.email};
  }

  private mapOwnerToApi(input: Owner): any {
    return {id: input.id, name: input.name, email: input.email};
  }

  public async get(id: string): Promise<Owner> {
    try {
      const result = await API.get('fourdowns', `/owners/${id}`, {});
      return this.mapApiToOwner(result);
    } catch (e) {
      throw e;
    }
  }

  public async list(
    queryStringParameters?: Record<string, unknown>,
  ): Promise<{items: Owner[]}> {
    try {
      const result = await API.get('fourdowns', '/owners', {
        queryStringParameters,
      });
      return {
        items: result.items.map((item: any) => {
          return this.mapApiToOwner(item);
        }),
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async create(body: Owner): Promise<Owner> {
    try {
      const result = await API.post('fourdowns', '/owners', {
        body: {
          sequence: '0',
          lastUpdateDate: new Date().toISOString(),
          lastUpdatedBy: 'system',
          ...this.mapOwnerToApi(body),
        },
      });
      return this.mapApiToOwner(result);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async update(
    id: string,
    updateKeys: string[],
    updates: Record<string, unknown>,
  ): Promise<Owner> {
    try {
      const result = await API.patch('fourdowns', `/owners/${id}`, {
        body: {
          ...updates,
          sequence: String(Number(updates.sequence) + 1),
        },
        queryStringParameters: {updateMask: updateKeys.join(',')},
      });
      return this.mapApiToOwner(result);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

export {Service as OwnersService};
