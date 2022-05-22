import { PlayerInterface } from '@sr-backoffice/backoffice-domain';
import {
  ChallengeInterface,
  ChallengeStatus,
  MatchInterface,
} from '@sr-challenges/challenges-domain';
import { Document } from 'mongoose';

export class Challenge extends Document implements ChallengeInterface {
  readonly _id: string;

  challengeDateTime: Date;

  status: ChallengeStatus;

  requestDateTime: Date;

  responseDateTime: Date;

  requester: PlayerInterface;

  category: string;

  players: PlayerInterface[];

  match: MatchInterface;

  constructor(challenge: Partial<Challenge>) {
    super(challenge);
  }
}
