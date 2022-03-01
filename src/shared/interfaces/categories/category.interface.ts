import { PlayerInterface } from './../../../../dist/players/interfaces/player.interface.d';
import { RankingEventInterface } from './ranking-event.interface';

export interface CategoryInterface {
  readonly category: string;

  description: string;

  rankingEvents: RankingEventInterface[];

  players: PlayerInterface[];
}
