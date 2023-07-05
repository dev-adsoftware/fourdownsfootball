import {
  IsArray,
  IsBoolean,
  IsDivisibleBy,
  IsEnum,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import {Type} from 'class-transformer';
import {Position} from '../types/position';
import {SequencedDto} from '../sequenced-dto';
import {SpecialSkill} from '../types/special-skill';
import {Dto} from '../dto';
import {AttributeKey} from '../types/attribute-key';
import {HeadType} from '../../../components/svg/faces/head';
import {HairBackgroundType} from '../../../components/svg/faces/hair-background';
import {EarType} from '../../../components/svg/faces/ear';
import {EyeLineType} from '../../../components/svg/faces/eye-line';
import {SmileLineType} from '../../../components/svg/faces/smile-line';
import {MiscLineType} from '../../../components/svg/faces/misc-line';
import {FacialHairType} from '../../../components/svg/faces/facial-hair';
import {EyeType} from '../../../components/svg/faces/eye';
import {EyebrowType} from '../../../components/svg/faces/eyebrow';
import {MouthType} from '../../../components/svg/faces/mouth';
import {NoseType} from '../../../components/svg/faces/nose';
import {HairType} from '../../../components/svg/faces/hair';

export class AttributeDto extends Dto {
  @IsEnum(AttributeKey)
  key: AttributeKey;

  @IsNumber()
  @IsDivisibleBy(1)
  value: number;

  @IsBoolean()
  secret = false;
}
export class PlayerDto extends SequencedDto {
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

  @IsOptional()
  @IsNumber()
  @IsDivisibleBy(1)
  @Min(0)
  @Max(99)
  jerseyNumber: number;

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

  @IsString()
  head: HeadType;

  @IsString()
  @IsOptional()
  hairBackground?: HairBackgroundType;

  @IsString()
  ear: EarType;

  @IsString()
  @IsOptional()
  eyeLine?: EyeLineType;

  @IsString()
  @IsOptional()
  smileLine?: SmileLineType;

  @IsString()
  @IsOptional()
  miscLine?: MiscLineType;

  @IsString()
  @IsOptional()
  facialHair?: FacialHairType;

  @IsString()
  eye: EyeType;

  @IsString()
  eyebrow: EyebrowType;

  @IsString()
  mouth: MouthType;

  @IsString()
  nose: NoseType;

  @IsString()
  hair: HairType;

  @IsString()
  skinColor: string;

  @IsString()
  primaryColor: string;

  @IsString()
  @IsOptional()
  secondaryColor?: string;

  @IsString()
  @IsOptional()
  accentColor?: string;

  @IsString()
  headShaveColor: string;

  @IsString()
  faceShaveColor: string;

  @IsString()
  hairColor: string;

  @IsBoolean()
  isFlipped: boolean;

  @IsOptional()
  @IsEnum(SpecialSkill)
  specialSkill?: SpecialSkill;

  @IsArray()
  @ValidateNested({each: true})
  @Type(() => AttributeDto)
  attributes: AttributeDto[];
}
