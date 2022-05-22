import { PlayerInterface } from '@sr-backoffice/backoffice-domain';
import { ResultInterface } from './result.interface';

export interface MatchInterface {
  readonly _id: string;

  category: string;

  players: PlayerInterface[];

  def: PlayerInterface;

  result: ResultInterface[];
}
