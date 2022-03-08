import {TeamDto, TownDto} from '../services/dtos';

export class TeamAvatarMaker {
  public static getAvatarAbbreviation(town?: TownDto, team?: TeamDto) {
    if (!town || !team) {
      return '?';
    }
    return `${town.name.slice(0, 1)}${team.nickname.slice(0, 1)}`;
  }
}
