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

  public static reducePlayChances(chances: PlayChanceSnapshotDto[]): {
    darkRedSlice: number;
    redSlice: number;
    greenSlice: number;
    lightGreenSlice: number;
  } {
    return chances.reduce(
      (previousChancesValue, currentChancesValue) => {
        if (
          currentChancesValue.category === PlayChanceCategory.ExtremeNegative
        ) {
          previousChancesValue.darkRedSlice += currentChancesValue.base;
        } else if (
          currentChancesValue.category === PlayChanceCategory.Negative
        ) {
          previousChancesValue.redSlice += currentChancesValue.base;
        } else if (
          currentChancesValue.category === PlayChanceCategory.Positive
        ) {
          previousChancesValue.greenSlice += currentChancesValue.base;
        } else if (
          currentChancesValue.category === PlayChanceCategory.ExtremePositive
        ) {
          previousChancesValue.lightGreenSlice += currentChancesValue.base;
        }

        return previousChancesValue;
      },
      {darkRedSlice: 0, redSlice: 0, greenSlice: 0, lightGreenSlice: 0},
    );
  }

  public static calcAvgGain(
    chances: PlayChanceSnapshotDto[],
  ): number | undefined {
    return undefined;
  }
}
