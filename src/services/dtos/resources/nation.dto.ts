import {IsString} from 'class-validator';
import {SequencedDto} from '../sequenced-dto';

class Dto extends SequencedDto {
  // no indexes

  @IsString()
  name: string;

  @IsString()
  abbr: string;
}

export {Dto as NationDto};
