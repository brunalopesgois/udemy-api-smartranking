import { PlayerInterface } from './../../../shared/interfaces/players/player.interface';
import { CategoryInterface } from './../../../shared/interfaces/categories/category.interface';
import { RankingEvent } from '../ranking-events/ranking-event.entity';
import { Document } from 'mongoose';

export class Category extends Document implements CategoryInterface {
  readonly _id: string;

  readonly category: string;

  description: string;

  rankingEvents: RankingEvent[];

  players: PlayerInterface[];

  constructor(category: Partial<Category>) {
    super(category);
  }
}
