import {IsOptional, IsString} from 'class-validator';
import {SequencedDto} from '../sequenced-dto';

class Dto extends SequencedDto {
  @IsString()
  ownerId: string;

  @IsString()
  teamId: string;

  @IsString()
  invitedOwnerId: string;

  @IsOptional()
  @IsString()
  invitedTeamId?: string;

  @IsString()
  status: string;
}

export {Dto as GameRequestDto};
