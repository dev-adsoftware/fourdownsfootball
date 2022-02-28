import {API} from 'aws-amplify';
import {GET_OWNER} from '../graphql/queries/get-owner.query';

export interface Owner {
  id: string;
  name: string;
  email: string;
}

class Service {
  constructor() {}

  public mapApiToOwner(input: any): Owner {
    return {id: input.id, name: input.name, email: input.email};
  }

  public mapOwnerToApi(input: Owner): any {
    return {id: input.id, name: input.name, email: input.email};
  }

  public async get(id: string): Promise<Owner> {
    try {
      console.log('calling owners rest api', id);
      console.log(API.endpoint('fourdowns'));
      const result = await API.get('fourdowns', `/owners/${id}`, {});
      console.log(result);

      // console.log('calling owners graphql');
      // // console.log(GET_OWNER);
      // const graphResult = await API.graphql({
      //   query: 'query { getOwner(id: "1") { id } }',
      // });
      // console.log(graphResult);

      return this.mapApiToOwner(result);
    } catch (e) {
      console.log('threw an error');
      console.log(e);
      // console.log(e.response);
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
