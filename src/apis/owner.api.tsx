import { Api } from './base.api';
import {
  OwnerSummaryView,
  OwnerAttributes,
} from '@dev-adsoftware/fourdownsfootball-dtos';
import { noop } from 'lodash';

export class OwnerApi extends Api {
  public async create(attributes: OwnerAttributes): Promise<OwnerSummaryView> {
    const ownerCreatedEvent = {
      type: 'owner.created',
      attributes,
    };

    const result = await this.eventApi.post(
      'owner',
      attributes.username,
      ownerCreatedEvent,
      '0',
    );

    let owner: OwnerSummaryView | undefined;
    do {
      try {
        owner = await this.get(result.id);
      } catch (e) {
        noop(e);
      }
    } while (!owner);
    return owner;
  }

  public async get(id: string): Promise<OwnerSummaryView> {
    const result = await this.apiGet<OwnerSummaryView>(`owners/${id}`);
    return result;
  }
}
