import {IsString} from 'class-validator';
import {Dto} from '../../dto';

export class GameDetailQueryArgsDto extends Dto {
  @IsString()
  id: string;
}
