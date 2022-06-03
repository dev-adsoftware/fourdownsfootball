import { IsString } from 'class-validator';
import { PlayerDto } from './player.dto';

class Dto extends PlayerDto {
  @IsString()
  teamSnapshotId: string;

  @IsString()
  gameId: string;

  @IsString()
  originalPlayerId: string;

  @IsString()
  originalSequence: string;
}

export { Dto as PlayerSnapshotDto };
