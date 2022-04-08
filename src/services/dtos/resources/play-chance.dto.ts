import {Type} from 'class-transformer';
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
import {Dto} from '../dto';
import {SequencedDto} from '../sequenced-dto';
import {PlayChanceCategory} from '../types/play-chance-category';
import {Position} from '../types/position';

class WeightDto extends Dto {
  @IsEnum(Position)
  position: Position;

  @IsString()
  skill: string;

  @IsNumber()
  @Max(1)
  @Min(0)
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

export {PlayChanceDto};
