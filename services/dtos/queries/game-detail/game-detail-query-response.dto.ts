import {Type} from 'class-transformer';
import {IsArray, IsObject, IsOptional, ValidateNested} from 'class-validator';
import {
  GameActionDto,
  GameDto,
  GameLogDto,
  LeagueDto,
  OwnerDto,
  PlayAptitudeSnapshotDto,
  PlayChanceSnapshotDto,
  PlayerSnapshotDto,
  PlaySnapshotDto,
  StateDto,
  TeamSnapshotDto,
  TownDto,
} from '../..';

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

export class GameDetailExtendedGameActionDto extends GameActionDto {
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => GameDetailExtendedPlaySnapshotDto)
  playSnapshot: GameDetailExtendedPlaySnapshotDto;
}

export class GameDetailExtendedGameLogDto extends GameLogDto {
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => GameDetailExtendedGameActionDto)
  initiatingGameAction?: GameDetailExtendedGameActionDto;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => GameDetailExtendedGameActionDto)
  completingGameAction?: GameDetailExtendedGameActionDto;
}

export class GameDetailQueryResponseDto extends GameDto {
  @IsObject()
  @ValidateNested()
  @Type(() => GameDetailExtendedTeamSnapshotDto)
  homeTeam: GameDetailExtendedTeamSnapshotDto;

  @IsObject()
  @ValidateNested()
  @Type(() => GameDetailExtendedTeamSnapshotDto)
  awayTeam: GameDetailExtendedTeamSnapshotDto;

  @IsArray()
  @ValidateNested({each: true})
  @Type(() => GameDetailExtendedGameLogDto)
  logs: GameDetailExtendedGameLogDto[];
}
