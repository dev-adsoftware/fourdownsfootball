import {IsNumberString, IsString} from 'class-validator';
import {Dto} from './dto';

export class SequencedDto extends Dto {
  @IsString()
  id: string;

  @IsNumberString()
  sequence: string;

  @IsString()
  lastUpdatedBy: string;

  @IsString()
  lastUpdateDate: string;
}
