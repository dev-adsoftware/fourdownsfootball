import {
  IsDivisibleBy,
  IsEnum,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import {Position} from '../types/position';
import {SequencedDto} from '../sequenced-dto';

class Dto extends SequencedDto {
  @IsString()
  teamId: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsIn(['Sr.', 'Jr.', 'I', 'II', 'II', 'IV'])
  suffix?: string;

  @IsEnum(Position)
  position: Position;

  @IsNumber()
  depthChartSlot: number;

  @IsNumber()
  @IsDivisibleBy(1)
  @Min(15)
  @Max(65)
  age: number;

  @IsNumber()
  @IsDivisibleBy(1)
  @Min(60)
  @Max(84)
  height: number;

  @IsNumber()
  @IsDivisibleBy(1)
  @Min(100)
  @Max(400)
  weight: number;

  @IsOptional()
  @IsNumber()
  @IsDivisibleBy(1)
  @Min(0)
  @Max(99)
  jerseyNumber: number;

  @IsNumber()
  @IsDivisibleBy(1)
  @Min(0)
  @Max(100)
  speed: number;

  @IsNumber()
  @IsDivisibleBy(1)
  @Min(0)
  @Max(100)
  strength: number;

  @IsNumber()
  @IsDivisibleBy(1)
  @Min(0)
  @Max(100)
  agility: number;

  @IsNumber()
  @IsDivisibleBy(1)
  @Min(0)
  @Max(100)
  quickness: number;

  @IsNumber()
  @IsDivisibleBy(1)
  @Min(0)
  @Max(100)
  passingStrength: number;

  @IsNumber()
  @IsDivisibleBy(1)
  @Min(0)
  @Max(100)
  shortPassAccuracy: number;

  @IsNumber()
  @IsDivisibleBy(1)
  @Min(0)
  @Max(100)
  mediumPassAccuracy: number;

  @IsNumber()
  @IsDivisibleBy(1)
  @Min(0)
  @Max(100)
  longPassAccuracy: number;

  @IsNumber()
  @IsDivisibleBy(1)
  @Min(0)
  @Max(100)
  scramblingPassAccuracy: number;

  @IsNumber()
  @IsDivisibleBy(1)
  @Min(0)
  @Max(100)
  scrambling: number;

  @IsNumber()
  @IsDivisibleBy(1)
  @Min(0)
  @Max(100)
  ballHandling: number;

  @IsNumber()
  @IsDivisibleBy(1)
  @Min(0)
  @Max(100)
  rushing: number;

  @IsNumber()
  @IsDivisibleBy(1)
  @Min(0)
  @Max(100)
  breakingTackles: number;

  @IsNumber()
  @IsDivisibleBy(1)
  @Min(0)
  @Max(100)
  routeRunning: number;

  @IsNumber()
  @IsDivisibleBy(1)
  @Min(0)
  @Max(100)
  catching: number;

  @IsNumber()
  @IsDivisibleBy(1)
  @Min(0)
  @Max(100)
  spectacularCatching: number;

  @IsNumber()
  @IsDivisibleBy(1)
  @Min(0)
  @Max(100)
  catchingInTraffic: number;

  @IsNumber()
  @IsDivisibleBy(1)
  @Min(0)
  @Max(100)
  jumping: number;

  @IsNumber()
  @IsDivisibleBy(1)
  @Min(0)
  @Max(100)
  passBlocking: number;

  @IsNumber()
  @IsDivisibleBy(1)
  @Min(0)
  @Max(100)
  runBlocking: number;

  @IsNumber()
  @IsDivisibleBy(1)
  @Min(0)
  @Max(100)
  runStuffing: number;

  @IsNumber()
  @IsDivisibleBy(1)
  @Min(0)
  @Max(100)
  passRushing: number;

  @IsNumber()
  @IsDivisibleBy(1)
  @Min(0)
  @Max(100)
  zoneCovering: number;

  @IsNumber()
  @IsDivisibleBy(1)
  @Min(0)
  @Max(100)
  manCovering: number;

  @IsNumber()
  @IsDivisibleBy(1)
  @Min(0)
  @Max(100)
  awareness: number;

  @IsNumber()
  @IsDivisibleBy(1)
  @Min(0)
  @Max(100)
  intelligence: number;

  @IsNumber()
  @IsDivisibleBy(1)
  @Min(0)
  @Max(100)
  clutch: number;

  @IsNumber()
  @IsDivisibleBy(1)
  @Min(0)
  @Max(100)
  endurance: number;

  @IsNumber()
  @IsDivisibleBy(1)
  @Min(0)
  @Max(100)
  stamina: number;

  @IsNumber()
  @IsDivisibleBy(1)
  @Min(0)
  @Max(100)
  fragility: number;

  @IsNumber()
  @IsDivisibleBy(1)
  @Min(0)
  @Max(100)
  toughness: number;

  @IsNumber()
  @IsDivisibleBy(1)
  @Min(0)
  @Max(100)
  returning: number;

  @IsNumber()
  @IsDivisibleBy(1)
  @Min(0)
  @Max(100)
  kickingPower: number;

  @IsNumber()
  @IsDivisibleBy(1)
  @Min(0)
  @Max(100)
  kickingAccuracy: number;

  @IsNumber()
  @IsDivisibleBy(1)
  @Min(0)
  @Max(100)
  puntingPower: number;

  @IsNumber()
  @IsDivisibleBy(1)
  @Min(0)
  @Max(100)
  puntingAccuracy: number;

  @IsNumber()
  @IsDivisibleBy(1)
  @Min(0)
  @Max(100)
  aggressiveness: number;

  @IsNumber()
  @IsDivisibleBy(1)
  @Min(0)
  @Max(100)
  riskTaking: number;

  @IsNumber()
  @IsDivisibleBy(1)
  @Min(0)
  @Max(100)
  sportsmanship: number;

  @IsNumber()
  @IsDivisibleBy(1)
  @Min(0)
  @Max(100)
  coachability: number;

  @IsNumber()
  @IsDivisibleBy(1)
  @Min(0)
  @Max(100)
  leadership: number;
}

export {Dto as PlayerDto};
