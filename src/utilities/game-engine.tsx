import {PieSlice} from '../components/svg/animated-pie-chart';
import {
  GameDetailQueryResponseDto,
  PlayChanceSnapshotDto,
} from '../services/dtos';
import {GameDetailExtendedTeamSnapshotDto} from '../services/dtos/queries/game-detail/game-detail-query-response.dto';
import {PlayChanceCategory} from '../services/dtos/types/play-chance-category';
import {PlaySubCategory} from '../services/dtos/types/play-sub-category';

export class GameEngine {
  public static getActingTeam(
    game: GameDetailQueryResponseDto,
  ): GameDetailExtendedTeamSnapshotDto {
    if (game.actingTeamId === game.homeTeamId) {
      return game.homeTeam;
    }
    return game.awayTeam;
  }

  public static getOffenseTeam(
    game: GameDetailQueryResponseDto,
  ): GameDetailExtendedTeamSnapshotDto {
    if (game.offenseTeamId === game.homeTeamId) {
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

  public static getTimeRemaining(
    game: GameDetailQueryResponseDto,
    teamId: string,
  ) {
    if (game.homeTeam.id === teamId) {
      return game.homeTeamTimeRemaining;
    }
    return game.awayTeamTimeRemaining;
  }

  public static getPlaySubCategoryAbbr(subCategory: PlaySubCategory): string {
    if (subCategory === PlaySubCategory.CoinToss) {
      return 'CT';
    }
    return subCategory;
  }

  public static reducePlayChances(
    chances: PlayChanceSnapshotDto[],
  ): PieSlice[] {
    return chances.reduce(
      (previousChancesValue, currentChancesValue) => {
        if (
          currentChancesValue.category === PlayChanceCategory.ExtremeNegative
        ) {
          previousChancesValue[0].startDegrees += currentChancesValue.base;
          previousChancesValue[0].endDegrees += currentChancesValue.base;
        } else if (
          currentChancesValue.category === PlayChanceCategory.Negative
        ) {
          previousChancesValue[1].startDegrees += currentChancesValue.base;
          previousChancesValue[1].endDegrees += currentChancesValue.base;
        } else if (
          currentChancesValue.category === PlayChanceCategory.Positive
        ) {
          previousChancesValue[2].startDegrees += currentChancesValue.base;
          previousChancesValue[2].endDegrees += currentChancesValue.base;
        } else if (
          currentChancesValue.category === PlayChanceCategory.ExtremePositive
        ) {
          previousChancesValue[3].startDegrees += currentChancesValue.base;
          previousChancesValue[3].endDegrees += currentChancesValue.base;
        }

        return previousChancesValue;
      },
      [
        {
          startDegrees: 0,
          endDegrees: 0,
        },
        {
          startDegrees: 0,
          endDegrees: 0,
        },
        {
          startDegrees: 0,
          endDegrees: 0,
        },
        {
          startDegrees: 0,
          endDegrees: 0,
        },
      ],
    );
  }

  public static calcAvgGain(
    chances: PlayChanceSnapshotDto[],
  ): number | undefined {
    return undefined;
  }
}
