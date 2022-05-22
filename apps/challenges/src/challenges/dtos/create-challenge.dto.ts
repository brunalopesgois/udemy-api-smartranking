import { PlayerInterface } from '@sr-backoffice/backoffice-domain';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';

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
