import {API} from 'aws-amplify';

export interface Nation {
  id: string;
  name: string;
  abbr: string;
  flagEmojiUnicode: string;
}

class Service {
  constructor() {}

  private mapApiToNation(input: any): Nation {
    return {
      id: input.id,
      name: input.name,
      abbr: input.abbr,
      flagEmojiUnicode: input.flagEmojiUnicode,
    };
  }

  private mapNationToApi(input: Nation): any {
    return {
      id: input.id,
      name: input.name,
      abbr: input.abbr,
      flagEmojiUnicode: input.flagEmojiUnicode,
    };
  }

  public async get(id: string): Promise<Nation> {
    try {
      const result = await API.get('fourdowns', `/nations/${id}`, {});
      return this.mapApiToNation(result);
    } catch (e) {
      throw e;
    }
  }

  public async list(
    queryStringParameters?: Record<string, unknown>,
  ): Promise<{items: Nation[]}> {
    try {
      const result = await API.get('fourdowns', '/nations', {
        queryStringParameters,
      });
      return {
        items: result.items.map((item: any) => {
          return this.mapApiToNation(item);
        }),
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async create(body: Nation): Promise<Nation> {
    try {
      const result = await API.post('fourdowns', '/nations', {
        body: {
          ...this.mapNationToApi(body),
          sequence: '0',
          lastUpdateDate: new Date().toISOString(),
          lastUpdatedBy: 'system',
        },
      });
      return this.mapApiToNation(result);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async update(
    id: string,
    updateKeys: string[],
    updates: Record<string, unknown>,
  ): Promise<Nation> {
    try {
      const result = await API.patch('fourdowns', `/nations/${id}`, {
        body: {
          ...updates,
          sequence: String(Number(updates.sequence) + 1),
        },
        queryStringParameters: {updateMask: updateKeys.join(',')},
      });
      return this.mapApiToNation(result);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

export {Service as NationsService};
