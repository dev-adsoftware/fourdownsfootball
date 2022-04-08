import {IsString} from 'class-validator';
import {PlayDto} from './play.dto';

class Dto extends PlayDto {
  // no indexes

  @IsString()
  originalPlayId: string;

  @IsString()
  originalSequence: string;
}

export {Dto as PlaySnapshotDto};
