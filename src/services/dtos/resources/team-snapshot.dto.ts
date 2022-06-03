import { IsString } from 'class-validator';
import { TeamDto } from './team.dto';

class Dto extends TeamDto {
  @IsString()
  gameId: string;

  @IsString()
  originalTeamId: string;

  @IsString()
  originalSequence: string;
}

export { Dto as TeamSnapshotDto };
