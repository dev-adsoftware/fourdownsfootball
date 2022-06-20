import {IsIn, IsString} from 'class-validator';
import {SequencedDto} from '../sequenced-dto';

class Dto extends SequencedDto {
  @IsString()
  ownerId: string;

  @IsString()
  teamId: string;

  @IsString()
  gameId: string;

  @IsIn(['home', 'away'])
  homeAway: 'home' | 'away';
}

export {Dto as GameParticipantDto};
