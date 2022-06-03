import { IsNumber, IsString } from 'class-validator';
import { PlayAptitudeDto } from './play-aptitude.dto';

class Dto extends PlayAptitudeDto {
  @IsString()
  teamSnapshotId: string;

  @IsString()
  playSnapshotId: string;

  @IsString()
  originalPlayAptitudeId: string;

  @IsString()
  originalSequence: string;

  @IsNumber()
  currentRepetitionPenalty: number;
}

export { Dto as PlayAptitudeSnapshotDto };
