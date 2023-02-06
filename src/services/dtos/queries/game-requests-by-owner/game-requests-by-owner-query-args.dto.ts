import { IsString } from 'class-validator';
import { Dto } from '../../dto';

export class GameRequestsByOwnerQueryArgsDto extends Dto {
  @IsString()
  id: string;
}
