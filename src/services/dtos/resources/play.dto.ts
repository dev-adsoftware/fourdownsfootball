import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDivisibleBy,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Dto } from '../dto';
import { SequencedDto } from '../sequenced-dto';
import { Alignment } from '../types/alignment';
import { Assignment } from '../types/assignment';
import { Formation } from '../types/formation';
import { PlayCategory } from '../types/play-category';
import { PlaySubCategory } from '../types/play-sub-category';
import { Position } from '../types/position';

export class AssignmentDto extends Dto {
  @IsEnum(Alignment)
  alignment: Alignment;

  @IsEnum(Assignment)
  assignment: Assignment = Assignment.None;

  @IsNumber()
  @IsDivisibleBy(1)
  @Min(0)
  passRoutePriority = 0;

  @IsOptional()
  @IsNumber()
  @IsDivisibleBy(1)
  @Min(0)
  passDistributionPct = 0;

  @IsEnum(Position)
  depthChartPosition: Position;

  @IsNumber()
  depthChartSlot: number;

  @IsBoolean()
  useBoost = false;
}

export class PlayDto extends SequencedDto {
  // no indexes

  @IsString()
  name: string;

  @IsEnum(PlayCategory)
  category: PlayCategory;

  @IsEnum(PlaySubCategory)
  subCategory: PlaySubCategory;

  @IsEnum(Formation)
  formation: Formation;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AssignmentDto)
  assignments: AssignmentDto[];

  @IsNumber()
  @IsDivisibleBy(1)
  repetitionPenalty: number;

  @IsNumber()
  @IsDivisibleBy(1)
  repetitionRechargeRate: number;
}
