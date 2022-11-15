import {Dto} from './dto';

class DtoList<T extends Dto = Dto> {
  public items: T[];

  public lastKey?: string;

  public serialize(): string {
    return JSON.stringify(this);
  }
}

export {DtoList};
