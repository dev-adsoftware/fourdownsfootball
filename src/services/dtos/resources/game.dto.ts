import {IsNumber, IsOptional, IsString} from 'class-validator';
import {SequencedDto} from '../sequenced-dto';

class Dto extends SequencedDto {
  // no indexes

  @IsOptional()
  @IsString()
  gameRequestId: string;

  @IsString()
  homeTeamId: string;

  @IsString()
  awayTeamId: string;

  @IsNumber()
  period: number;

  @IsNumber()
  timeRemaining: number;

  @IsNumber()
  ballOn: number;

  @IsNumber()
  down: number;

  @IsNumber()
  distance: number;

  @IsString()
  direction: string;

  @IsString()
  offenseTeamId: string;

  @IsString()
  actingTeamId: string;

  @IsString()
  state: string;

  @IsNumber()
  seed: number;

  @IsNumber()
  homeTeamScore: number;

  @IsNumber()
  awayTeamScore: number;

  @IsNumber()
  momentum: number;

  @IsNumber()
  homeTeamTimeRemaining: number;

  @IsNumber()
  awayTeamTimeRemaining: number;
}

export {Dto as GameDto};
