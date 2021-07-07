import { API } from '@aws-amplify/api';
import { EventApi } from './event.api';

export class Api {
  protected eventApi: EventApi;

  constructor() {
    this.eventApi = new EventApi();
  }

  public async apiGet<T>(endpoint: string): Promise<T> {
    try {
      console.log(`GET /${endpoint}`);
      const result = await API.get('fourdowns', `/${endpoint}`, {});
      return result;
    } catch (e) {
      console.log('apiGet error');
      throw e;
    }
  }
}
