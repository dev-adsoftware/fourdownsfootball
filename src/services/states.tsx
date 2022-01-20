import {API} from 'aws-amplify';

export interface State {
  id: string;
  ownerId: string;
  nickname: string;
}

class Service {
  constructor() {}

  private mapApiToState(input: any): State {
    return {id: input.id, ownerId: input.ownerId, nickname: input.nickname};
  }

  private mapStateToApi(input: State): any {
    return {id: input.id, ownerId: input.ownerId, nickname: input.nickname};
  }

  public async get(id: string): Promise<State> {
    try {
      const result = await API.get('fourdowns', `/states/${id}`, {});
      return this.mapApiToState(result);
    } catch (e) {
      throw e;
    }
  }

  public async listByNation(
    nationId: string,
    queryStringParameters?: Record<string, unknown>,
  ): Promise<{items: State[]}> {
    try {
      const result = await API.get('fourdowns', `/nations/${nationId}/states`, {
        queryStringParameters,
      });
      return {
        items: result.items.map((item: any) => {
          return this.mapApiToState(item);
        }),
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async create(body: State): Promise<State> {
    try {
      const result = await API.post('fourdowns', '/states', {
        body: {
          ...this.mapStateToApi(body),
          sequence: '0',
          lastUpdateDate: new Date().toISOString(),
          lastUpdatedBy: 'system',
        },
      });
      return this.mapApiToState(result);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async update(
    id: string,
    updateKeys: string[],
    updates: Record<string, unknown>,
  ): Promise<State> {
    try {
      const result = await API.patch('fourdowns', `/states/${id}`, {
        body: {
          ...updates,
          sequence: String(Number(updates.sequence) + 1),
        },
        queryStringParameters: {updateMask: updateKeys.join(',')},
      });
      return this.mapApiToState(result);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

export {Service as StatesService};
