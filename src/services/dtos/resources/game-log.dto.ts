import {Type} from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import {PlayChanceSnapshotDto} from '.';
import {SequencedDto} from '../sequenced-dto';
import {LogType} from '../types/log-type';

class Dto extends SequencedDto {
  @IsString()
  gameId: string;

  @IsEnum(LogType)
  logType: LogType;

  @IsString()
  headline: string;

  @IsArray()
  @IsString({each: true})
  details: string[];

  @ValidateIf(o => o.logType === LogType.Result)
  @IsNumber()
  chanceResult?: number;

  @ValidateIf(o => o.logType === LogType.Result)
  @IsArray()
  @ValidateNested({each: true})
  @Type(() => PlayChanceSnapshotDto)
  playChances?: PlayChanceSnapshotDto[];

  @IsOptional()
  @IsString()
  initiatingGameActionId?: string;

  @IsOptional()
  @IsString()
  completingGameActionId?: string;
}

export {Dto as GameLogDto};
