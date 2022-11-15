import {Type} from 'class-transformer';
import {IsArray, IsObject, ValidateIf, ValidateNested} from 'class-validator';
import {
  GameDto,
  GameInviteDto,
  GameParticipantDto,
  GameRequestDto,
  LeagueDto,
  NotificationDto,
  OwnerDto,
  StateDto,
  TeamDto,
  TeamRequestDto,
  TeamSnapshotDto,
  TownDto,
} from '../..';
import {Dto} from '../../dto';

export class OwnerDashboardExtendedTownDto extends TownDto {
  @ValidateNested()
  @Type(() => StateDto)
  state: StateDto;
}
export class OwnerDashboardExtendedTeamDto extends TeamDto {
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
  @Type(() => OwnerDashboardExtendedTownDto)
  town: OwnerDashboardExtendedTownDto;
}

export class OwnerDashboardExtendedTeamSnapshotDto extends TeamSnapshotDto {
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
  @Type(() => OwnerDashboardExtendedTownDto)
  town: OwnerDashboardExtendedTownDto;
}

export class OwnerDashboardExtendedTeamRequestDto extends TeamRequestDto {
  @IsObject()
  @ValidateNested()
  @Type(() => OwnerDto)
  owner: OwnerDto;

  @IsObject()
  @ValidateNested()
  @Type(() => OwnerDashboardExtendedTownDto)
  town: OwnerDashboardExtendedTownDto;
}

export class OwnerDashboardExtendedGameRequestDto extends GameRequestDto {
  @IsObject()
  @ValidateNested()
  @Type(() => OwnerDto)
  invitedOwner: OwnerDto;

  @ValidateIf(o => o.invitedTeamId)
  @IsObject()
  @ValidateNested()
  @Type(() => OwnerDashboardExtendedTeamDto)
  invitedTeam: OwnerDashboardExtendedTeamDto;

  @IsObject()
  @ValidateNested()
  @Type(() => OwnerDto)
  owner: OwnerDto;

  @IsObject()
  @ValidateNested()
  @Type(() => OwnerDashboardExtendedTeamDto)
  team: OwnerDashboardExtendedTeamDto;
}

export class OwnerDashboardExtendedGameInviteDto extends GameInviteDto {
  @IsObject()
  @ValidateNested()
  @Type(() => OwnerDashboardExtendedGameRequestDto)
  gameRequest: OwnerDashboardExtendedGameRequestDto;

  @ValidateIf(o => o.teamId)
  @IsObject()
  @ValidateNested()
  @Type(() => OwnerDashboardExtendedTeamDto)
  team: OwnerDashboardExtendedTeamDto;
}

export class OwnerDashboardExtendedGameDto extends GameDto {
  @IsObject()
  @ValidateNested()
  @Type(() => OwnerDashboardExtendedTeamSnapshotDto)
  homeTeam: OwnerDashboardExtendedTeamSnapshotDto;

  @IsObject()
  @ValidateNested()
  @Type(() => OwnerDashboardExtendedTeamSnapshotDto)
  awayTeam: OwnerDashboardExtendedTeamSnapshotDto;
}

export class OwnerDashboardExtendedGameParticipantDto extends GameParticipantDto {
  @IsObject()
  @ValidateNested()
  @Type(() => OwnerDto)
  owner: OwnerDto;

  @IsObject()
  @ValidateNested()
  @Type(() => OwnerDashboardExtendedTeamDto)
  team: OwnerDashboardExtendedTeamDto;

  @IsObject()
  @ValidateNested()
  @Type(() => OwnerDashboardExtendedGameDto)
  game: OwnerDashboardExtendedGameDto;
}
export class OwnerDashboardQueryResponseDto extends Dto {
  @IsObject()
  @ValidateNested()
  @Type(() => OwnerDto)
  owner: OwnerDto;

  @IsArray()
  @ValidateNested({each: true})
  @Type(() => OwnerDashboardExtendedTeamDto)
  teams: OwnerDashboardExtendedTeamDto[];

  @IsArray()
  @ValidateNested({each: true})
  @Type(() => OwnerDashboardExtendedTeamRequestDto)
  teamRequests: OwnerDashboardExtendedTeamRequestDto[];

  @IsArray()
  @ValidateNested({each: true})
  @Type(() => OwnerDashboardExtendedGameRequestDto)
  gameRequests: OwnerDashboardExtendedGameRequestDto[];

  @IsArray()
  @ValidateNested({each: true})
  @Type(() => OwnerDashboardExtendedGameInviteDto)
  gameInvites: OwnerDashboardExtendedGameInviteDto[];

  @IsArray()
  @ValidateNested({each: true})
  @Type(() => OwnerDashboardExtendedGameParticipantDto)
  gameParticipants: OwnerDashboardExtendedGameParticipantDto[];

  @IsArray()
  @ValidateNested({each: true})
  @Type(() => NotificationDto)
  notifications: NotificationDto[];
}
