import {Type} from 'class-transformer';
import {IsArray, IsObject, ValidateIf, ValidateNested} from 'class-validator';
import {
  GameDto,
  LeagueDto,
  OwnerDto,
  PlayAptitudeSnapshotDto,
  PlayCallDto,
  PlayChanceSnapshotDto,
  PlayerSnapshotDto,
  PlayResultDto,
  PlaySnapshotDto,
  PossessionDto,
  StateDto,
  TeamSnapshotDto,
  TownDto,
} from '../..';
import {GameState} from '../../types/game-state';

export class GameDetailExtendedTownDto extends TownDto {
  @ValidateNested()
  @Type(() => StateDto)
  state: StateDto;
}

export class GameDetailExtendedPlaySnapshotDto extends PlaySnapshotDto {
  @IsArray()
  @ValidateNested({each: true})
  @Type(() => PlayChanceSnapshotDto)
  playChances: PlayChanceSnapshotDto[];

  @IsObject()
  @ValidateNested()
  @Type(() => PlayAptitudeSnapshotDto)
  playAptitude: PlayAptitudeSnapshotDto;
}
export class GameDetailExtendedTeamSnapshotDto extends TeamSnapshotDto {
  @IsObject()
  @ValidateNested()
  @Type(() => LeagueDto)
  league: LeagueDto;

  @IsObject()
  @ValidateNested()
  @Type(() => OwnerDto)
  owner: OwnerDto;

  @IsObject()
  @ValidateNested()
  @Type(() => GameDetailExtendedTownDto)
  town: GameDetailExtendedTownDto;

  @IsArray()
  @ValidateNested({each: true})
  @Type(() => PlayerSnapshotDto)
  players: PlayerSnapshotDto[];

  @IsArray()
  @ValidateNested({each: true})
  @Type(() => GameDetailExtendedPlaySnapshotDto)
  plays: GameDetailExtendedPlaySnapshotDto[];
}

export class GameDetailExtendedPlayCallDto extends PlayCallDto {}

export class GameDetailExtendedPlayResultDto extends PlayResultDto {
  @IsArray()
  @ValidateNested({each: true})
  @Type(() => GameDetailExtendedPlayCallDto)
  playCalls: GameDetailExtendedPlayCallDto[];
}

export class GameDetailExtendedPossessionDto extends PossessionDto {
  @IsArray()
  @ValidateNested({each: true})
  @Type(() => GameDetailExtendedPlayResultDto)
  playResults: GameDetailExtendedPlayResultDto[];
}

export class GameDetailQueryResponseDto extends GameDto {
  @IsObject()
  @ValidateNested()
  @Type(() => OwnerDto)
  homeOwner: OwnerDto;

  @IsObject()
  @ValidateNested()
  @Type(() => OwnerDto)
  awayOwner: OwnerDto;

  @ValidateIf(o => o.state !== GameState.AwaitingRSVP)
  @IsObject()
  @ValidateNested()
  @Type(() => GameDetailExtendedTeamSnapshotDto)
  homeTeam?: GameDetailExtendedTeamSnapshotDto;

  @ValidateIf(o => o.state !== GameState.AwaitingRSVP)
  @IsObject()
  @ValidateNested()
  @Type(() => GameDetailExtendedTeamSnapshotDto)
  awayTeam?: GameDetailExtendedTeamSnapshotDto;

  @IsArray()
  @ValidateNested({each: true})
  @Type(() => GameDetailExtendedPossessionDto)
  possessions: GameDetailExtendedPossessionDto[];
}
