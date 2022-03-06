import { PlayerInterface } from '../players/player.interface';
import { ResultInterface } from './result.interface';

export interface MatchInterface {
  readonly _id: string;

  category: string;

  players: PlayerInterface[];

  def: PlayerInterface;

  result: ResultInterface[];
}
