import {Type} from 'class-transformer';
import {IsArray, IsObject, ValidateNested} from 'class-validator';
import {
  GameDto,
  GameParticipantDto,
  LeagueDto,
  OwnerDto,
  PlayAptitudeDto,
  PlayChanceDto,
  PlayDto,
  PlayerDto,
  StateDto,
  TeamDto,
  TownDto,
} from '../..';

export class TeamDetailExtendedTownDto extends TownDto {
  @ValidateNested()
  @Type(() => StateDto)
  state: StateDto;
}

export class TeamDetailExtendedTeamDto extends TeamDto {
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
  @Type(() => TeamDetailExtendedTownDto)
  town: TeamDetailExtendedTownDto;
}

export class TeamDetailExtendedGameDto extends GameDto {
  @IsObject()
  @ValidateNested()
  @Type(() => TeamDetailExtendedTeamDto)
  homeTeam: TeamDetailExtendedTeamDto;

  @IsObject()
  @ValidateNested()
  @Type(() => TeamDetailExtendedTeamDto)
  awayTeam: TeamDetailExtendedTeamDto;
}

export class TeamDetailExtendedGameParticipantDto extends GameParticipantDto {
  @IsObject()
  @ValidateNested()
  @Type(() => TeamDetailExtendedGameDto)
  game: TeamDetailExtendedGameDto;
}

export class TeamDetailExtendedPlayDto extends PlayDto {
  @IsArray()
  @ValidateNested({each: true})
  @Type(() => PlayChanceDto)
  playChances: PlayChanceDto[];

  @IsObject()
  @ValidateNested()
  @Type(() => PlayAptitudeDto)
  playAptitude: PlayAptitudeDto;
}
export class TeamDetailQueryResponseDto extends TeamDto {
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
  @Type(() => TeamDetailExtendedTownDto)
  town: TeamDetailExtendedTownDto;

  @IsArray()
  @ValidateNested({each: true})
  @Type(() => TeamDetailExtendedGameParticipantDto)
  gameParticipants: TeamDetailExtendedGameParticipantDto[];

  @IsArray()
  @ValidateNested({each: true})
  @Type(() => PlayerDto)
  players: PlayerDto[];

  @IsArray()
  @ValidateNested({each: true})
  @Type(() => TeamDetailExtendedPlayDto)
  plays: TeamDetailExtendedPlayDto[];
}
