import { CategoryInterface } from './../../../shared/interfaces/categories/category.interface';
import { RankingEvent } from './../events/event.entity';
import { Document } from 'mongoose';

export class Category extends Document implements CategoryInterface {
  readonly category: string;

  description: string;

  rankingEvents: RankingEvent[];

  players: string[];

  constructor(category: Partial<Category>) {
    super(category);
  }
}
