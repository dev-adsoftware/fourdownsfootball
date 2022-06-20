import {IsBoolean, IsOptional, IsString} from 'class-validator';
import {SequencedDto} from '../sequenced-dto';

class Dto extends SequencedDto {
  @IsString()
  ownerId: string;

  @IsString()
  title: string;

  @IsString()
  message: string;

  @IsString()
  recordType: string;

  @IsString()
  recordId: string;

  @IsOptional()
  @IsBoolean()
  isRead?: boolean;
}

export {Dto as NotificationDto};
