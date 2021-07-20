import { Api } from './base.api';
import {
  PlayerRandomizedEvent,
  PlayerSummaryView,
  RandomPlayerTypes,
} from '@dev-adsoftware/fourdownsfootball-dtos';
import { noop } from 'lodash';
import { v4 } from 'uuid';
import delay from 'delay';

export class PlayerApi extends Api {
  public async createRandom(teamId: string): Promise<PlayerSummaryView> {
    const playerRandomizedEvent = new PlayerRandomizedEvent().init({
      currentSeed: new Date().valueOf(),
      teamId,
      playerType: RandomPlayerTypes.N,
    });

    const result = await this.eventApi.post(
      'player',
      v4(),
      JSON.parse(playerRandomizedEvent.serialize()),
      '0',
    );

    let player: PlayerSummaryView | undefined;
    do {
      try {
        player = await this.get(result.id);
      } catch (e) {
        noop(e);
        await delay(100);
      }
    } while (!player);

    console.log(player);

    return player;
  }

  public async get(id: string): Promise<PlayerSummaryView> {
    const result = await this.apiGet<PlayerSummaryView>(`players/${id}`);
    return result;
  }
}
