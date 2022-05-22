import { PlayerInterface } from '@sr-backoffice/backoffice-domain';
import { ChallengeStatus } from '../enums';
import { MatchInterface } from './match.interface';

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
