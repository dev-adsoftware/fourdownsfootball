import { IsString } from 'class-validator';
import { PlayChanceDto } from './play-chance.dto';

class Dto extends PlayChanceDto {
  @IsString()
  playSnapshotId: string;

  @IsString()
  originalPlayChanceId: string;

  @IsString()
  originalSequence: string;
}

export { Dto as PlayChanceSnapshotDto };
