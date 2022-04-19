import {IsNumber, IsOptional, IsString} from 'class-validator';
import {SequencedDto} from '../sequenced-dto';

class Dto extends SequencedDto {
  @IsString()
  gameId: string;

  @IsString()
  message: string;

  @IsOptional()
  @IsNumber()
  chance?: number;
}

export {Dto as GameLogDto};
