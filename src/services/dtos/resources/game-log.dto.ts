import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from "class-validator";
import { SequencedDto } from "../sequenced-dto";
import { LogType } from "../types/log-type";

class Dto extends SequencedDto {
  @IsString()
  gameId: string;

  @IsEnum(LogType)
  logType: LogType;

  @IsString()
  headline: string;

  @IsArray()
  @IsString({ each: true })
  details: string[];

  @ValidateIf((o) => o.logType === LogType.Result)
  @IsNumber()
  chanceResult?: number;

  @IsOptional()
  @IsString()
  initiatingGameActionId?: string;

  @IsOptional()
  @IsString()
  completingGameActionId?: string;
}

export { Dto as GameLogDto };
