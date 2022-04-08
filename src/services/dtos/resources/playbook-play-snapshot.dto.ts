import {IsDivisibleBy, IsNumber, IsString} from 'class-validator';
import {PlaybookPlayDto} from './playbook-play.dto';

class Dto extends PlaybookPlayDto {
  @IsString()
  teamSnapshotId: string;

  @IsString()
  originalPlaybookPlayId: string;

  @IsString()
  originalSequence: string;

  @IsString()
  playSnapshotId: string;

  @IsNumber()
  @IsDivisibleBy(1)
  currentRepetitionPenalty: number;
}

export {Dto as PlaybookPlaySnapshotDto};
