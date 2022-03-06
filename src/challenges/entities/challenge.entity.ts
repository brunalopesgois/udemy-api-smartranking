import { Document } from 'mongoose';
import { ChallengeStatus } from './../../shared/enums/challenges/challenge-status.enum';
import { ChallengeInterface } from './../../shared/interfaces/challenges/challenge.interface';
import { PlayerInterface } from './../../shared/interfaces/players/player.interface';
import { Match } from './match.entity';

export class Challenge extends Document implements ChallengeInterface {
  challengeDateTime: Date;

  status: ChallengeStatus;

  requestDateTime: Date;

  responseDateTime: Date;

  requester: PlayerInterface;

  category: string;

  players: PlayerInterface[];

  match: Match;

  constructor(challenge: Partial<Challenge>) {
    super(challenge);
  }
}
