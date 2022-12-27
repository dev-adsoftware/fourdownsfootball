import {IsEmail, IsString} from 'class-validator';
import {SequencedDto} from '../sequenced-dto';

class Dto extends SequencedDto {
  // no indexes

  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  displayName: string;
}

export {Dto as OwnerDto};
