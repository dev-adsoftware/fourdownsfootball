import { Api } from './base.api';
import {
  TeamSummaryView,
  TeamAttributes,
} from '@dev-adsoftware/fourdownsfootball-dtos';
import { noop } from 'lodash';
import { v4 } from 'uuid';

export class TeamApi extends Api {
  public async create(
    ownerId: string,
    attributes: TeamAttributes,
  ): Promise<TeamSummaryView> {
    const teamCreatedEvent = {
      type: 'team.created',
      ownerId,
      attributes,
    };

    const result = await this.eventApi.post(
      'team',
      v4(),
      teamCreatedEvent,
      '0',
    );

    let team: TeamSummaryView | undefined;
    do {
      try {
        team = await this.get(result.id);
      } catch (e) {
        noop(e);
      }
    } while (!team);
    return team;
  }

  public async get(id: string): Promise<TeamSummaryView> {
    const result = await this.apiGet<TeamSummaryView>(`teams/${id}`);
    return result;
  }

  public async list(ownerId: string): Promise<{ items: TeamSummaryView[] }> {
    const result = await this.apiGet<{ items: TeamSummaryView[] }>(
      `teams/owner/${ownerId}`,
    );
    return result;
  }

  public citySortFn = (a: TeamSummaryView, b: TeamSummaryView): number => {
    return a.attributes.city > b.attributes.city ? 1 : -1;
  };
}
