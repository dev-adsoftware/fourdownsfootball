import { Aggregate } from '@dev-adsoftware/fourdownsfootball-dtos';
import { API } from '@aws-amplify/api';
import { AggregateFactory } from '@dev-adsoftware/fourdownsfootball-dtos';

export class EventApi {
  public async post(
    aggregate: string,
    id: string,
    payload: Record<string, unknown>,
    sequence?: string,
  ): Promise<Aggregate> {
    try {
      const response = await API.post('fourdowns', '/events', {
        body: new AggregateFactory().create(
          JSON.stringify({
            aggregate,
            id,
            sequence,
            date: new Date().toISOString(),
            event: {
              source: 'app',
              version: '1',
              ...payload,
            },
          }),
        ),
      });
      return response;
    } catch (e) {
      console.log('EventApi post error');
      console.log(e);
      throw e;
    }
  }
}
