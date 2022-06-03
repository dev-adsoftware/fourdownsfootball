import { IsNumber } from 'class-validator';
import { SequencedDto } from '../sequenced-dto';

class Dto extends SequencedDto {
  // no indexes

  @IsNumber()
  seed: number;
}

export { Dto as RandomSeedDto };
