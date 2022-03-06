import {
  ArrayMaxSize,
  ArrayMinSize,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';
import { PlayerInterface } from './../../shared/interfaces/players/player.interface';

export class CreateChallengeDto {
  @IsNotEmpty()
  @IsDateString()
  challengeDateTime: Date;

  @IsNotEmpty()
  requester: PlayerInterface;

  @IsNotEmpty()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  players: PlayerInterface[];
}
