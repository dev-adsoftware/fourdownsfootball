import {IsEmail, IsString} from 'class-validator';
import {SequencedDto} from '../sequenced-dto';

class Dto extends SequencedDto {
  // no indexes

  @IsString()
  name: string;

  @IsEmail()
  email: string;
}

export {Dto as OwnerDto};
