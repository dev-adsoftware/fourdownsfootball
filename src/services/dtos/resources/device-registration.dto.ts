import {IsOptional, IsString} from 'class-validator';
import {SequencedDto} from '../sequenced-dto';

class Dto extends SequencedDto {
  @IsString()
  ownerId: string;

  @IsString()
  token: string;

  @IsOptional()
  @IsString()
  endpointArn?: string;
}

export {Dto as DeviceRegistrationDto};
