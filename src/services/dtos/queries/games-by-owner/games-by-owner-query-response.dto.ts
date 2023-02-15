import { Type } from 'class-transformer';
import {
  IsArray,
  IsObject,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { GameDto, GameRequestDto, LeagueDto, OwnerDto, StateDto, TeamDto, TownDto } from '../..';
import { Dto } from '../../dto';

export class GamesByOwnerExtendedTownDto extends TownDto {
  @ValidateNested()
  @Type(() => StateDto)
  state: StateDto;
}
export class GamesByOwnerExtendedTeamDto extends TeamDto {
  @IsObject()
  @ValidateNested()
  @Type(() => LeagueDto)
  league: LeagueDto;

  @IsObject()
  @ValidateNested()
  @Type(() => GamesByOwnerExtendedTownDto)
  town: GamesByOwnerExtendedTownDto;
}

export class GamesByOwnerExtendedGameDto extends GameDto {
  @IsObject()
  @ValidateNested()
  @Type(() => OwnerDto)
  homeOwner: OwnerDto;

  @ValidateIf(o => o.invitedTeamId)
  @IsObject()
  @ValidateNested()
  @Type(() => GamesByOwnerExtendedTeamDto)
  homeTeam: GamesByOwnerExtendedTeamDto;

  @IsObject()
  @ValidateNested()
  @Type(() => OwnerDto)
  awayOwner: OwnerDto;

  @ValidateIf(o => o.awayTeamId)
  @IsObject()
  @ValidateNested()
  @Type(() => GamesByOwnerExtendedTeamDto)
  awayTeam: GamesByOwnerExtendedTeamDto;
}

export class GamesByOwnerExtendedGameRequestDto extends GameRequestDto {
  @IsObject()
  @ValidateNested()
  @Type(() => OwnerDto)
  homeOwner: OwnerDto;

  @ValidateIf(o => o.homeAway === 'home' || o.invitedTeamId)
  @IsObject()
  @ValidateNested()
  @Type(() => GamesByOwnerExtendedTeamDto)
  homeTeam: GamesByOwnerExtendedTeamDto;

  @IsObject()
  @ValidateNested()
  @Type(() => OwnerDto)
  awayOwner: OwnerDto;

  @ValidateIf(o => o.homeAway === 'away' || o.invitedTeamId)
  @IsObject()
  @ValidateNested()
  @Type(() => GamesByOwnerExtendedTeamDto)
  awayTeam: GamesByOwnerExtendedTeamDto;
}

export class GamesByOwnerQueryResponseDto extends Dto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GamesByOwnerExtendedGameRequestDto)
  pendingGames: GamesByOwnerExtendedGameRequestDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GamesByOwnerExtendedGameDto)
  inProgressGames: GamesByOwnerExtendedGameDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GamesByOwnerExtendedGameDto)
  historicalGames: GamesByOwnerExtendedGameDto[];

  @IsOptional()
  @IsString()
  lastKey?: string;
}
