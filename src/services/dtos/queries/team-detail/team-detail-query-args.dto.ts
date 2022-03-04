import {IsString} from 'class-validator';
import {Dto} from '../../dto';

export class TeamDetailQueryArgsDto extends Dto {
  @IsString()
  id: string;
}
