import { IsOptional, IsString } from 'class-validator';
import { SequencedDto } from '../sequenced-dto';

class Dto extends SequencedDto {
  @IsString()
  ownerId: string;

  @IsString()
  gameRequestId: string;

  @IsOptional()
  @IsString()
  teamId?: string;

  @IsString()
  status: string;
}

export { Dto as GameInviteDto };
