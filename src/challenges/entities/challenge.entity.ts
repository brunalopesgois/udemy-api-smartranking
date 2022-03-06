import { Document } from 'mongoose';
import { ChallengeStatus } from './../../shared/enums/challenges/challenge-status.enum';
import { ChallengeInterface } from './../../shared/interfaces/challenges/challenge.interface';
import { PlayerInterface } from './../../shared/interfaces/players/player.interface';
import { MatchInterface } from './../../shared/interfaces/matches/match.interface';

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
