import {IsEnum, IsOptional, IsString} from 'class-validator';
import {SequencedDto} from '../sequenced-dto';
import {DefenseStyle} from '../types/defense-style';
import {OffenseStyle} from '../types/offense-style';
import {TeamEmphasis} from '../types/team-emphasis';
import {TeamRequestStatus} from '../types/team-request-status';

class Dto extends SequencedDto {
  @IsString()
  ownerId: string;

  @IsString()
  townId: string;

  @IsString()
  nickname: string;

  @IsString()
  primaryColor: string;

  @IsOptional()
  @IsString()
  secondaryColor?: string;

  @IsOptional()
  @IsString()
  stripeColor?: string;

  @IsEnum(TeamEmphasis)
  teamEmphasis: string;

  @IsEnum(OffenseStyle)
  offenseStyle: string;

  @IsEnum(DefenseStyle)
  defenseStyle: string;

  @IsOptional()
  @IsEnum(TeamRequestStatus)
  status?: string;
}

export {Dto as TeamRequestDto};
