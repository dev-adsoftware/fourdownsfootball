import {Type} from 'class-transformer';
import {IsObject, ValidateNested} from 'class-validator';
import {GameDto, LeagueDto, OwnerDto, StateDto, TeamDto, TownDto} from '../..';

export class GameDetailExtendedTownDto extends TownDto {
  @ValidateNested()
  @Type(() => StateDto)
  state: StateDto;
}
export class GameDetailExtendedTeamDto extends TeamDto {
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
}
export class GameDetailQueryResponseDto extends GameDto {
  @IsObject()
  @ValidateNested()
  @Type(() => GameDetailExtendedTeamDto)
  homeTeam: GameDetailExtendedTeamDto;

  @IsObject()
  @ValidateNested()
  @Type(() => GameDetailExtendedTeamDto)
  awayTeam: GameDetailExtendedTeamDto;
}
