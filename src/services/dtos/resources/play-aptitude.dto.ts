import {IsDivisibleBy, IsNumber, IsString} from 'class-validator';
import {SequencedDto} from '../sequenced-dto';

class Dto extends SequencedDto {
  @IsString()
  teamId: string;

  @IsString()
  playId: string;

  @IsNumber()
  @IsDivisibleBy(1)
  competence: number;

  @IsNumber()
  @IsDivisibleBy(1)
  experience: number;
}

export {Dto as PlayAptitudeDto};
