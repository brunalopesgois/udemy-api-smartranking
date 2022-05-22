import {
  CategoryInterface,
  PlayerInterface,
} from '@sr-backoffice/backoffice-domain';
import { Document } from 'mongoose';
import { RankingEvent } from './ranking-event.entity';

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
