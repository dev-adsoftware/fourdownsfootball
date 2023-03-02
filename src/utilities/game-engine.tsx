import {noop} from 'lodash';
import {
  GameDetailQueryResponseDto,
  GameDto,
  GameRequestDto,
  PlayChanceSnapshotDto,
} from '../services/dtos';
import {GameDetailExtendedTeamSnapshotDto} from '../services/dtos/queries/game-detail/game-detail-query-response.dto';
import {
  GamesByOwnerExtendedGameDto,
  GamesByOwnerExtendedTeamDto,
} from '../services/dtos/queries/games-by-owner/games-by-owner-query-response.dto';
import {Alignment} from '../services/dtos/types/alignment';
import {Formation} from '../services/dtos/types/formation';
import {GameState} from '../services/dtos/types/game-state';
import {PlayChanceCategory} from '../services/dtos/types/play-chance-category';
import {PlaySubCategory} from '../services/dtos/types/play-sub-category';

export class GameEngine {
  public static getActingTeam(
    game: GamesByOwnerExtendedGameDto | GameDetailQueryResponseDto,
  ): GameDetailExtendedTeamSnapshotDto {
    if (game.actingTeamId === game.homeTeamId) {
      return game.homeTeam as GameDetailExtendedTeamSnapshotDto;
    }
    return game.awayTeam as GameDetailExtendedTeamSnapshotDto;
  }

  public static getOffenseTeam(
    game: GamesByOwnerExtendedGameDto | GameDetailQueryResponseDto,
  ): GameDetailExtendedTeamSnapshotDto {
    if (game.offenseTeamId === game.homeTeamId) {
      return game.homeTeam as GameDetailExtendedTeamSnapshotDto;
    }
    return game.awayTeam as GameDetailExtendedTeamSnapshotDto;
  }

  public static getDefenseTeam(
    game: GamesByOwnerExtendedGameDto | GameDetailQueryResponseDto,
  ): GameDetailExtendedTeamSnapshotDto {
    if (game.offenseTeamId !== game.homeTeamId) {
      return game.homeTeam as GameDetailExtendedTeamSnapshotDto;
    }
    return game.awayTeam as GameDetailExtendedTeamSnapshotDto;
  }

  public static getOwnerTeam(
    game: GamesByOwnerExtendedGameDto | GameDetailQueryResponseDto,
    ownerId: string,
  ): GameDetailExtendedTeamSnapshotDto {
    if (game.homeTeam?.ownerId === ownerId) {
      return game.homeTeam as GameDetailExtendedTeamSnapshotDto;
    }
    return game.awayTeam as GameDetailExtendedTeamSnapshotDto;
  }

  public static getOpposingTeam(
    game: GamesByOwnerExtendedGameDto | GameDetailQueryResponseDto,
    ownerId: string,
  ): GameDetailExtendedTeamSnapshotDto {
    if (game.homeTeam?.ownerId === ownerId) {
      return game.awayTeam as GameDetailExtendedTeamSnapshotDto;
    }
    return game.homeTeam as GameDetailExtendedTeamSnapshotDto;
  }

  public static canNudgeOrWithdraw(
    game: GameRequestDto | GameDto,
    ownerId: string,
  ): boolean {
    if ((game as GameRequestDto).ownerId === ownerId) {
      return true;
    }
    const gameDto = game as GameDto;
    if (
      gameDto.state === GameState.AwaitingRSVP &&
      ((gameDto.homeOwnerId === ownerId && gameDto.homeTeamId !== 'TBD') ||
        (gameDto.awayOwnerId === ownerId && gameDto.awayTeamId !== 'TBD'))
    ) {
      return true;
    }
    return false;
  }

  public static canRSVP(
    game: GameRequestDto | GameDto,
    ownerId: string,
  ): boolean {
    if ((game as GameRequestDto).invitedOwnerId === ownerId) {
      return true;
    }
    const gameDto = game as GameDto;
    if (
      gameDto.state === GameState.AwaitingRSVP &&
      ((gameDto.homeOwnerId === ownerId && gameDto.homeTeamId === 'TBD') ||
        (gameDto.awayOwnerId === ownerId && gameDto.awayTeamId === 'TBD'))
    ) {
      return true;
    }
    return false;
  }

  public static canAct(
    game: GameRequestDto | GameDto,
    ownerId: string | undefined,
  ): boolean {
    const gameDto = game as GameDto;
    if (gameDto.actingTeamId === gameDto.homeTeamId) {
      return gameDto.homeOwnerId === ownerId;
    }
    return gameDto.awayOwnerId === ownerId;
  }

  public static isOnOffense(
    game: GameRequestDto | GameDto,
    ownerId: string | undefined,
  ): boolean {
    const gameDto = game as GameDto;
    if (gameDto.offenseTeamId === gameDto.homeTeamId) {
      return gameDto.homeOwnerId === ownerId;
    }
    return gameDto.awayOwnerId === ownerId;
  }

  public static isHomeTeamOnOffense(game: GameRequestDto | GameDto): boolean {
    const gameDto = game as GameDto;
    return gameDto.offenseTeamId === gameDto.homeTeamId;
  }

  public static flipBallOn(
    game: GameRequestDto | GameDto,
    ownerId: string | undefined,
  ): number {
    const gameDto = game as GameDto;
    if (GameEngine.isOnOffense(gameDto, ownerId)) {
      return 100 - gameDto.ballOn;
    }
    return gameDto.ballOn;
  }

  public static isInProgress(game: GameRequestDto | GameDto): boolean {
    return ![GameState.AwaitingRSVP, GameState.Loading].includes(
      (game as GameDto).state || (game as GameRequestDto).status,
    );
  }

  public static getTeamAbbreviation(
    team?: GameDetailExtendedTeamSnapshotDto | GamesByOwnerExtendedTeamDto,
  ) {
    if (!team) {
      return '?';
    }

    return `${team.town.name.slice(0, 1)}${team.nickname.slice(0, 1)}`;
  }

  public static getTimeRemaining(
    game: GameDetailQueryResponseDto,
    teamId: string,
  ) {
    if (game.homeTeam?.id === teamId) {
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
    } else if (gameState === GameState.AwaitingRSVP) {
      return 'Awaiting RSVP';
    } else if (gameState === GameState.Kickoff) {
      return 'Kickoff';
    } else {
      return 'Active';
    }
  }

  public static getFormationName(formation: Formation): string {
    if (formation === Formation.Kickoff) {
      return 'SPECIAL TEAMS';
    } else if (formation === Formation.KickoffReturn) {
      return 'SPECIAL TEAMS';
    } else if (formation === Formation.SingleBack) {
      return 'SINGLE BACK';
    } else {
      return `${formation}`;
    }
  }

  public static getPeriodName(period: number): string {
    if (period === 0) {
      return 'Pregame';
    }
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
    noop(chances);
    return undefined;
  }
}
