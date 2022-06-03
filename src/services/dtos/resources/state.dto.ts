import { IsString } from 'class-validator';
import { SequencedDto } from '../sequenced-dto';

class Dto extends SequencedDto {
  @IsString()
  nationId: string;

  @IsString()
  name: string;

  @IsString()
  abbr: string;
}

export { Dto as StateDto };
