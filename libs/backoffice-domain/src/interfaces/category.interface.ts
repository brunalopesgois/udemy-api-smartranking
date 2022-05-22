import { PlayerInterface } from './player.interface';
import { RankingEventInterface } from './ranking-event.interface';

export interface CategoryInterface {
  readonly _id: string;

  readonly category: string;

  description: string;

  rankingEvents: RankingEventInterface[];

  players: PlayerInterface[];
}
