import {IsIn, IsOptional, IsString} from 'class-validator';
import {SequencedDto} from '../sequenced-dto';

class Dto extends SequencedDto {
  @IsString()
  ownerId: string;

  @IsString()
  townId: string;

  @IsString()
  nickname: string;

  @IsString()
  primaryColor: string;

  @IsOptional()
  @IsString()
  secondaryColor?: string;

  @IsOptional()
  @IsString()
  stripeColor?: string;

  @IsIn(['Balanced', 'Defense', 'Offense'])
  teamEmphasis: string;

  @IsIn([
    'Balanced',
    'Balanced Passing',
    'Deep Passing',
    'Short Passing',
    'Rushing',
  ])
  offenseStyle: string;

  @IsIn(['Balanced', 'Pass Coverage', 'Pass Rush', 'Run Stop'])
  defenseStyle: string;

  @IsOptional()
  @IsIn([
    'Processing',
    'Building Roster',
    'Finding League Assignment',
    'Complete',
  ])
  status?: string;
}

export {Dto as TeamRequestDto};
