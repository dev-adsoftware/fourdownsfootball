import {GameDetailQueryResponseDto} from '../services/dtos';
import {GameDetailExtendedTeamSnapshotDto} from '../services/dtos/queries/game-detail/game-detail-query-response.dto';

export class GameEngine {
  public static getActingTeam(
    game: GameDetailQueryResponseDto,
  ): GameDetailExtendedTeamSnapshotDto {
    if (game.actingTeamId === game.homeTeamId) {
      return game.homeTeam;
    }
    return game.awayTeam;
  }

  public static getTeamAbbreviation(team: GameDetailExtendedTeamSnapshotDto) {
    if (!team) {
      return '?';
    }

    return `${team.town.name.slice(0, 1)}${team.nickname.slice(0, 1)}`;
  }
}
