import {IsBoolean, IsNumber, IsString} from 'class-validator';
import {SequencedDto} from '../sequenced-dto';

class Dto extends SequencedDto {
  @IsString()
  gameId: string;

  @IsNumber()
  possessionNumber: number;

  @IsNumber()
  playResultNumber: number;

  @IsString()
  description: string;

  @IsNumber()
  period: number;

  @IsNumber()
  startTimeRemaining: number;

  @IsNumber()
  elapsedTime: number;

  @IsNumber()
  startDown: number;

  @IsNumber()
  startDistance: number;

  @IsNumber()
  startBallOn: number;

  @IsNumber()
  yardsGained: number;

  @IsBoolean()
  gainedFirstDown: boolean;
}

export {Dto as PlayResultDto};
