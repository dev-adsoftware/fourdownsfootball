import {IsOptional, IsString} from 'class-validator';
import {Dto} from '../../dto';

export class GamesByOwnerQueryArgsDto extends Dto {
  @IsString()
  id: string;

  @IsString()
  @IsOptional()
  afterKey?: string;
}
