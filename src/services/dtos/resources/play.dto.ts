import {
  IsDivisibleBy,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import {SequencedDto} from '../sequenced-dto';
import {PlayCategory} from '../types/play-category';
import {PlaySubCategory} from '../types/play-sub-category';
import {Position} from '../types/position';

class Dto extends SequencedDto {
  // no indexes

  @IsString()
  name: string;

  @IsEnum(PlayCategory)
  category: PlayCategory;

  @IsOptional()
  @IsString()
  formationName?: string;

  @IsOptional()
  @IsEnum(Position, {each: true})
  formationMap?: Position[];

  @IsOptional()
  @IsEnum(Position, {each: true})
  skillPositionMap?: Position[];

  @IsOptional()
  @IsString()
  subCategory?: PlaySubCategory;

  @IsOptional()
  @IsString()
  ballCarrier?: Position;

  @IsOptional()
  @IsEnum(Position, {each: true})
  passReceiversMap?: Position[];

  @IsOptional()
  @IsNumber(undefined, {each: true})
  @IsDivisibleBy(1, {each: true})
  passDistributionMap?: number[];

  @IsOptional()
  @IsNumber()
  @IsDivisibleBy(1)
  repetitionPenalty?: number;

  @IsOptional()
  @IsNumber()
  @IsDivisibleBy(1)
  repetitionRechargeRate?: number;
}

export {Dto as PlayDto};
