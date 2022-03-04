import {IsNumber, IsString} from 'class-validator';
import {SequencedDto} from '../sequenced-dto';
// class GameLog extends Dto {
//   @IsBoolean()
//   untimed = false;

//   @ValidateIf((o) => !o.untimed)
//   @IsNumber()
//   period: number;

//   @ValidateIf((o) => !o.untimed)
//   @IsNumber()
//   timeRemaining: number;

//   @ValidateIf((o) => !o.untimed)
//   @IsNumber()
//   down: number;

//   @ValidateIf((o) => !o.untimed)
//   @IsNumber()
//   distance: number;

//   @ValidateIf((o) => !o.untimed)
//   @IsNumber()
//   ballOn: number;

//   @ValidateIf((o) => !o.untimed)
//   @IsString()
//   log: string;
// }

// class GameDrive extends Dto {
//   @IsBoolean()
//   untimed = false;

//   @ValidateIf((o) => !o.untimed)
//   @IsString()
//   offenseTeamId: string;

//   @ValidateIf((o) => !o.untimed)
//   @IsString()
//   result: string;

//   @ValidateIf((o) => !o.untimed)
//   @IsNumber()
//   numberOfPlays: number;

//   @ValidateIf((o) => !o.untimed)
//   @IsNumber()
//   yardsGained: number;

//   @ValidateIf((o) => !o.untimed)
//   @IsNumber()
//   timeOfPossession: number;

//   @ValidateIf((o) => !o.untimed)
//   @IsNumber()
//   awayTeamScore: number;

//   @ValidateIf((o) => !o.untimed)
//   @IsNumber()
//   homeTeamScore: number;

//   @ValidateIf((o) => !o.untimed)
//   @IsArray()
//   @ValidateNested({ each: true })
//   @Type(() => GameLog)
//   logs: GameLog[];
// }

class Dto extends SequencedDto {
  // no indexes

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
}

export {Dto as GameDto};
