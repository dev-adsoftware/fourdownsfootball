import { IsNumber, IsString } from 'class-validator';
import { SequencedDto } from '../sequenced-dto';

class Dto extends SequencedDto {
  @IsString()
  stateId: string;

  @IsString()
  name: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsNumber()
  population: number;

  @IsString()
  timezone: string;
}

export { Dto as TownDto };
