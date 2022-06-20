import {IsString} from 'class-validator';
import {SequencedDto} from '../sequenced-dto';

class Dto extends SequencedDto {
  // no indexes

  @IsString()
  name: string;

  @IsString()
  type: string;
}

export {Dto as LeagueDto};
