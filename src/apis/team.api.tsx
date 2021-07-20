import { Api } from './base.api';
import {
  TeamSummaryView,
  TeamAttributes,
  TeamRosterView,
} from '@dev-adsoftware/fourdownsfootball-dtos';
import { noop } from 'lodash';
import { v4 } from 'uuid';
import { PlayerApi } from './player.api';
import delay from 'delay';

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
        await delay(100);
      }
    } while (!team);

    await new PlayerApi().createRandom(team.id);
    return team;
  }

  public async get(id: string): Promise<TeamSummaryView> {
    const result = await this.apiGet<TeamSummaryView>(`teams/${id}`);
    return result;
  }

  public async list(ownerId: string): Promise<{ items: TeamSummaryView[] }> {
    const result = await this.apiGet<{ items: TeamSummaryView[] }>(
      `owners/${ownerId}/teams`,
    );
    return result;
  }

  public async getRoster(teamId: string): Promise<TeamRosterView> {
    const result = await this.apiGet<TeamRosterView>(`teams/${teamId}/roster`);
    console.log(result);
    return result;
  }

  public citySortFn = (a: TeamSummaryView, b: TeamSummaryView): number => {
    return a.attributes.city > b.attributes.city ? 1 : -1;
  };
}
