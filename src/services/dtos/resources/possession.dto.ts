import {IsNumber, IsString} from 'class-validator';
import {SequencedDto} from '../sequenced-dto';

class Dto extends SequencedDto {
  @IsString()
  gameId: string;

  @IsNumber()
  possessionNumber: number;

  @IsString()
  headline: string;

  @IsString()
  summary: string;
}

export {Dto as PossessionDto};
