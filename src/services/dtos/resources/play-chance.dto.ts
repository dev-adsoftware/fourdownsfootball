import { Type } from 'class-transformer';
import {
  IsArray,
  IsDivisibleBy,
  IsEnum,
  IsNumber,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { Dto } from '../dto';
import { SequencedDto } from '../sequenced-dto';
import { Alignment } from '../types/alignment';
import { AttributeKey } from '../types/attribute-key';
import { PlayChanceCategory } from '../types/play-chance-category';

export class WeightDto extends Dto {
  @IsEnum(Alignment)
  alignment: Alignment;

  @IsEnum(AttributeKey)
  skill: AttributeKey;

  @IsNumber()
  @Max(1)
  @Min(-1)
  value: number;
}

class PlayChanceDto extends SequencedDto {
  @IsString()
  playId: string;

  @IsNumber()
  @IsDivisibleBy(1)
  @Min(1)
  priority: number;

  @IsEnum(PlayChanceCategory)
  category: PlayChanceCategory;

  @IsString()
  result: string;

  @IsNumber()
  @IsDivisibleBy(1)
  base: number;

  @IsNumber()
  @IsDivisibleBy(1)
  deviation: number;

  @IsArray()
  @ValidateNested()
  @Type(() => WeightDto)
  weights: WeightDto[];

  @IsArray()
  @ValidateNested()
  @Type(() => WeightDto)
  counterweights: WeightDto[];
}

export { PlayChanceDto };
