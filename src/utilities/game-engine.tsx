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

  public static getOwnerTeam(
    game: GameDetailQueryResponseDto,
    ownerId: string,
  ): GameDetailExtendedTeamSnapshotDto {
    if (game.homeTeam.ownerId === ownerId) {
      return game.homeTeam;
    }
    return game.awayTeam;
  }

  public static getOpposingTeam(
    game: GameDetailQueryResponseDto,
    ownerId: string,
  ): GameDetailExtendedTeamSnapshotDto {
    if (game.homeTeam.ownerId === ownerId) {
      return game.awayTeam;
    }
    return game.homeTeam;
  }

  public static getTeamAbbreviation(team: GameDetailExtendedTeamSnapshotDto) {
    if (!team) {
      return '?';
    }

    return `${team.town.name.slice(0, 1)}${team.nickname.slice(0, 1)}`;
  }
}
