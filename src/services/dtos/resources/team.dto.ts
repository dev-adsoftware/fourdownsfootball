import { IsOptional, IsString } from 'class-validator';
import { SequencedDto } from '../sequenced-dto';

class Dto extends SequencedDto {
  @IsString()
  ownerId: string;

  @IsString()
  leagueId: string;

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
}

export { Dto as TeamDto };
