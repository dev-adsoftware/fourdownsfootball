import {API} from 'aws-amplify';
import {Dto} from './dtos/dto';
import {SequencedDto} from './dtos/sequenced-dto';

export class BaseService {
  constructor(private readonly apiName: string = 'fourdowns') {}

  public getStatusFromError(e: any): number {
    return (e as {response: {status: number}}).response.status;
  }

  protected async get<T extends Dto>(
    path: string,
    queryStringParameters: Record<string, unknown>,
  ): Promise<T> {
    try {
      return (await API.get(this.apiName, path, {queryStringParameters})) as T;
    } catch (e) {
      throw e;
    }
  }

  protected async list<T extends Dto>(
    path: string,
    queryStringParameters: Record<string, unknown>,
  ): Promise<{items: T[]}> {
    try {
      return {
        items: (
          await API.get(this.apiName, path, {
            queryStringParameters,
          })
        ).items as T[],
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  protected async create<T extends SequencedDto>(
    path: string,
    body: T,
  ): Promise<T> {
    try {
      return (await API.post(this.apiName, path, {
        body: {
          sequence: '0',
          lastUpdateDate: new Date().toISOString(),
          lastUpdatedBy: 'app',
          ...body.toPlainObject(),
        },
      })) as T;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  protected async update<T extends SequencedDto>(
    path: string,
    currentRecord: T,
    updates: Record<string, unknown>,
    updateKeys: string[],
  ): Promise<T> {
    try {
      return (await API.patch(this.apiName, path, {
        body: {
          sequence: String(Number(currentRecord.sequence) + 1),
          lastUpdateDate: new Date().toISOString(),
          lastUpdatedBy: 'app',
          ...updates,
        },
        queryStringParameters: {
          updateMask: `sequence,lastUpdateDate,lastUpdatedBy,${updateKeys.join(
            ',',
          )}`,
        },
      })) as T;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
