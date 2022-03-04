import {IsString, IsJSON} from 'class-validator';
import {SequencedDto} from '../sequenced-dto';

class Dto extends SequencedDto {
  @IsString()
  gameId: string;

  @IsString()
  actingTeamId: string;

  @IsString()
  action: string;

  @IsString()
  @IsJSON()
  data: string;
}

export {Dto as GameActionDto};
