import {IsString} from 'class-validator';
import {Dto} from '../../dto';

export class OwnerDashboardQueryArgsDto extends Dto {
  @IsString()
  id: string;
}
