import { PlayerInterface } from '../players/player.interface';
import { ChallengeStatus } from './../../enums/challenges/challenge-status.enum';
import { MatchInterface } from './match.interface';

export interface ChallengeInterface {
  challengeDateTime: Date;

  status: ChallengeStatus;

  requestDateTime: Date;

  responseDateTime: Date;

  requester: PlayerInterface;

  category: string;

  players: PlayerInterface[];

  match: MatchInterface;
}
