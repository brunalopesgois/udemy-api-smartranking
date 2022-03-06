import { Document } from 'mongoose';
import { PlayerInterface } from './../../shared/interfaces/players/player.interface';
import { MatchInterface } from './../../shared/interfaces/challenges/match.interface';
import { Result } from './result.entity';

export class Match extends Document implements MatchInterface {
  category: string;

  players: PlayerInterface[];

  def: PlayerInterface;

  result: Result[];

  constructor(match: Partial<Match>) {
    super(match);
  }
}
