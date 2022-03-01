import { RankingEventInterface } from './../../../shared/interfaces/categories/ranking-event.interface';
import { Document } from 'mongoose';

export class RankingEvent extends Document implements RankingEventInterface {
  name: string;

  operation: string;

  value: number;

  constructor(rankingEvent: Partial<RankingEvent>) {
    super(rankingEvent);
  }
}
