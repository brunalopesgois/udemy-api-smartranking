import { MatchInterface } from '../matches/match.interface';
import { PlayerInterface } from '../players/player.interface';
import { ChallengeStatus } from './../../enums/challenges/challenge-status.enum';

export interface ChallengeInterface {
  readonly _id: string;

  challengeDateTime: Date;

  status: ChallengeStatus;

  requestDateTime: Date;

  responseDateTime: Date;

  requester: PlayerInterface;

  category: string;

  players: PlayerInterface[];

  match: MatchInterface;
}
