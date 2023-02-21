import {IsIn, IsOptional, IsString} from 'class-validator';
import {SequencedDto} from '../sequenced-dto';
import {GameState} from '../types/game-state';

class Dto extends SequencedDto {
  @IsString()
  ownerId: string;

  @IsString()
  teamId: string;

  @IsIn(['home', 'away'])
  homeAway: 'home' | 'away';

  @IsString()
  invitedOwnerId: string;

  @IsOptional()
  @IsString()
  invitedTeamId?: string;

  @IsIn([GameState.AwaitingRSVP])
  status: GameState.AwaitingRSVP;
}

export {Dto as GameRequestDto};
