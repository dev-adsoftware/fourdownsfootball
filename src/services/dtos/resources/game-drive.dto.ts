import {IsString, ValidateIf, IsNumber, IsBoolean} from 'class-validator';
import {SequencedDto} from '../sequenced-dto';

class Dto extends SequencedDto {
  @IsString()
  gameId: string;

  @IsBoolean()
  untimed = false;

  @ValidateIf(o => !o.untimed)
  @IsString()
  offenseTeamId: string;

  @ValidateIf(o => !o.untimed)
  @IsString()
  result: string;

  @ValidateIf(o => !o.untimed)
  @IsNumber()
  numberOfPlays: number;

  @ValidateIf(o => !o.untimed)
  @IsNumber()
  yardsGained: number;

  @ValidateIf(o => !o.untimed)
  @IsNumber()
  timeOfPossession: number;

  @ValidateIf(o => !o.untimed)
  @IsNumber()
  awayTeamScore: number;

  @ValidateIf(o => !o.untimed)
  @IsNumber()
  homeTeamScore: number;
}

export {Dto as GameDriveDto};
