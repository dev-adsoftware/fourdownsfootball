import { IsEnum, IsNumber, IsString, ValidateIf } from 'class-validator';
import { SequencedDto } from '../sequenced-dto';
import { Direction } from '../types/directions';
import { GameState } from '../types/game-state';

class Dto extends SequencedDto {
  @IsString()
  homeOwnerId: string;

  @IsString()
  awayOwnerId: string;

  @ValidateIf(
    o =>
      o.state !== GameState.AwaitingRSVP ||
      (o.state === GameState.AwaitingRSVP && o.awayTeamId === undefined),
  )
  @IsString()
  homeTeamId?: string;

  @ValidateIf(
    o =>
      o.state !== GameState.AwaitingRSVP ||
      (o.state === GameState.AwaitingRSVP && o.homeTeamId === undefined),
  )
  @IsString()
  awayTeamId?: string;

  @IsNumber()
  period = 0;

  @IsNumber()
  timeRemaining = 0;

  @IsNumber()
  ballOn = 0;

  @IsNumber()
  down = 0;

  @IsNumber()
  distance = 0;

  @IsEnum(Direction)
  direction = Direction.North;

  @ValidateIf(o => o.state !== GameState.AwaitingRSVP && o.state !== GameState.Loading)
  @IsString()
  offenseTeamId: string;

  @ValidateIf(o => o.state !== GameState.AwaitingRSVP && o.state !== GameState.Loading)
  @IsString()
  actingTeamId: string;

  @IsEnum(GameState)
  state = GameState.AwaitingRSVP;

  @IsNumber()
  seed = 0;

  @IsNumber()
  homeTeamScore = 0;

  @IsNumber()
  awayTeamScore = 0;

  @IsNumber()
  momentum = 0;

  @IsNumber()
  homeTeamTimeRemaining = 0;

  @IsNumber()
  awayTeamTimeRemaining = 0;
}

export { Dto as GameDto };
