import {Type} from 'class-transformer';
import {IsString, IsBoolean, IsArray, ValidateNested} from 'class-validator';
import {SequencedDto} from '../sequenced-dto';
import {AssignmentDto} from './play.dto';

class Dto extends SequencedDto {
  @IsString()
  gameId: string;

  @IsString()
  actingTeamSnapshotId: string;

  @IsString()
  playbookPlaySnapshotId: string;

  @IsBoolean()
  flipped: boolean;

  @IsBoolean()
  noHuddle: boolean;

  @IsBoolean()
  hurryUp: boolean;

  @IsArray()
  @ValidateNested({each: true})
  @Type(() => AssignmentDto)
  assignments: AssignmentDto[];
}

export {Dto as GameActionDto};
