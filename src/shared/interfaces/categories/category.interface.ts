import { PlayerInterface } from './../players/player.interface';
import { RankingEventInterface } from './ranking-event.interface';

export interface CategoryInterface {
  readonly category: string;

  description: string;

  rankingEvents: RankingEventInterface[];

  players: PlayerInterface[];
}
