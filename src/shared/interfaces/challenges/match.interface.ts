import { PlayerInterface } from '../players/player.interface';
import { ResultInterface } from './result.interface';

export interface MatchInterface {
  category: string;

  players: PlayerInterface[];

  def: PlayerInterface;

  result: ResultInterface[];
}
