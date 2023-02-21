import {Type} from 'class-transformer';
import {IsArray, IsNumber, IsString, ValidateNested} from 'class-validator';
import {SequencedDto} from '../sequenced-dto';
import {AssignmentDto} from './play.dto';

class Dto extends SequencedDto {
  @IsString()
  gameId: string;

  @IsNumber()
  possessionNumber: number;

  @IsNumber()
  playResultNumber: number;

  @IsString()
  playSnapshotId: string;

  @IsArray()
  @ValidateNested({each: true})
  @Type(() => AssignmentDto)
  assignments: AssignmentDto[];
}

export {Dto as PlayCallDto};
