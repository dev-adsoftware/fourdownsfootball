import {AxiosInstance} from 'axios';
import {Dto} from './dtos/dto';
import {DtoList} from './dtos/dto-list';
import {SequencedDto} from './dtos/sequenced-dto';

export class BaseService {
  constructor(public client: AxiosInstance, public baseUrl: string) {}

  public getStatusFromError(e: any): number {
    return (e as {response: {status: number}}).response.status;
  }

  protected async get<T extends Dto>(
    path: string,
    queryStringParameters: Record<string, unknown>,
  ): Promise<T> {
    try {
      return (
        await this.client.get<T>(`${this.baseUrl}/${path}`, {
          params: queryStringParameters,
        })
      ).data;
    } catch (e) {
      throw e;
    }
  }

  protected async list<T extends Dto>(
    path: string,
    queryStringParameters: Record<string, unknown>,
  ): Promise<DtoList<T>> {
    try {
      return (
        await this.client.get<DtoList<T>>(`${this.baseUrl}/${path}`, {
          params: queryStringParameters,
        })
      ).data;
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
      return (
        await this.client.post<T>(`${this.baseUrl}/${path}`, {
          sequence: '0',
          lastUpdateDate: new Date().toISOString(),
          lastUpdatedBy: 'app',
          ...body.toPlainObject(),
        })
      ).data;
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
      return (
        await this.client.patch<T>(
          `${this.baseUrl}/${path}`,
          {
            sequence: String(Number(currentRecord.sequence) + 1),
            lastUpdateDate: new Date().toISOString(),
            lastUpdatedBy: 'app',
            ...updates,
          },
          {
            params: {
              updateMask: `sequence,lastUpdateDate,lastUpdatedBy,${updateKeys.join(
                ',',
              )}`,
            },
          },
        )
      ).data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
