import {IsString} from 'class-validator';
import {SequencedDto} from '../sequenced-dto';

class Dto extends SequencedDto {
  @IsString()
  gameId: string;

  @IsString()
  property: string;
}

export {Dto as GameLogDto};
