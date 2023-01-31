import {IsNumberString, IsSemVer, IsString} from 'class-validator';
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

  @IsSemVer()
  version = '1.0.0';
}
