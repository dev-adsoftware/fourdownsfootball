import { Type } from 'class-transformer';
import { IsArray, IsObject, ValidateIf, ValidateNested } from 'class-validator';
import { GameRequestDto, LeagueDto, OwnerDto, StateDto, TeamDto, TownDto } from '../..';
import { Dto } from '../../dto';

export class GameRequestsByOwnerExtendedTownDto extends TownDto {
  @ValidateNested()
  @Type(() => StateDto)
  state: StateDto;
}
export class GameRequestsByOwnerExtendedTeamDto extends TeamDto {
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
  @Type(() => GameRequestsByOwnerExtendedTownDto)
  town: GameRequestsByOwnerExtendedTownDto;
}

export class GameRequestsByOwnerExtendedGameRequestDto extends GameRequestDto {
  @IsObject()
  @ValidateNested()
  @Type(() => OwnerDto)
  invitedOwner: OwnerDto;

  @ValidateIf(o => o.invitedTeamId)
  @IsObject()
  @ValidateNested()
  @Type(() => GameRequestsByOwnerExtendedTeamDto)
  invitedTeam: GameRequestsByOwnerExtendedTeamDto;

  @IsObject()
  @ValidateNested()
  @Type(() => OwnerDto)
  owner: OwnerDto;

  @IsObject()
  @ValidateNested()
  @Type(() => GameRequestsByOwnerExtendedTeamDto)
  team: GameRequestsByOwnerExtendedTeamDto;
}

export class GameRequestsByOwnerQueryResponseDto extends Dto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GameRequestsByOwnerExtendedGameRequestDto)
  gameRequests: GameRequestsByOwnerExtendedGameRequestDto[];
}
