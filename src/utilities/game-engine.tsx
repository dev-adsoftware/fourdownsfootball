import {
  GameDetailQueryResponseDto,
  PlayChanceSnapshotDto,
} from '../services/dtos';
import {GameDetailExtendedTeamSnapshotDto} from '../services/dtos/queries/game-detail/game-detail-query-response.dto';
import {Alignment} from '../services/dtos/types/alignment';
import {Formation} from '../services/dtos/types/formation';
import {GameState} from '../services/dtos/types/game-state';
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
    } else if (subCategory === PlaySubCategory.Kickoff) {
      return 'K';
    }
    return subCategory;
  }

  public static getAlignmentAbbr(alignment?: Alignment): string | undefined {
    switch (alignment) {
      case Alignment.KickoffKicker:
        return 'K';
      case Alignment.KickoffStreaker1:
      case Alignment.KickoffStreaker2:
      case Alignment.KickoffStreaker3:
      case Alignment.KickoffStreaker4:
      case Alignment.KickoffStreaker5:
      case Alignment.KickoffStreaker6:
      case Alignment.KickoffStreaker7:
      case Alignment.KickoffStreaker8:
      case Alignment.KickoffStreaker9:
      case Alignment.KickoffStreaker10:
        return 'ST';
      case Alignment.KickoffReturner:
        return 'KR';
      case Alignment.KickoffBlocker1:
      case Alignment.KickoffBlocker2:
      case Alignment.KickoffBlocker3:
      case Alignment.KickoffBlocker4:
      case Alignment.KickoffBlocker5:
      case Alignment.KickoffBlocker6:
      case Alignment.KickoffBlocker7:
      case Alignment.KickoffBlocker8:
      case Alignment.KickoffBlocker9:
      case Alignment.KickoffBlocker10:
        return 'BLK';
      case Alignment.QBUnderCenter:
        return 'QB';
      case Alignment.XReceiver:
        return 'X';
      case Alignment.YReceiver:
        return 'Y';
      case Alignment.ZReceiver:
        return 'TE1';
      case Alignment.HalfBack:
        return 'HB';
      case Alignment.AReceiver:
        return 'A';
      default:
        return undefined;
    }
  }

  public static getGameStateName(gameState?: GameState): string {
    if (gameState === GameState.Loading) {
      return 'Loading';
    } else if (gameState === GameState.Kickoff) {
      return 'Kickoff';
    } else {
      return 'Active';
    }
  }

  public static getFormationName(formation: Formation): string {
    if (formation === Formation.Kickoff) {
      return 'Kickoff';
    } else if (formation === Formation.KickoffReturn) {
      return 'Kick Return';
    } else {
      return `${formation}`;
    }
  }

  public static getPeriodName(period: number): string {
    if (period === 1) {
      return '1st';
    }
    if (period === 2) {
      return '2nd';
    }
    if (period === 3) {
      return '3rd';
    }
    if (period === 4) {
      return '4th';
    }
    return 'OT';
  }

  public static formatGameTime(timeRemaining: number): string {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    return `${minutes > 0 ? minutes : '0'}:${
      seconds < 10 ? '0' : ''
    }${seconds}`;
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
