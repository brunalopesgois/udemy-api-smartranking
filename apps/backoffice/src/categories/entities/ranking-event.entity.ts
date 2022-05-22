import { RankingEventInterface } from '@sr-backoffice/backoffice-domain';
import { Document } from 'mongoose';

export class RankingEvent extends Document implements RankingEventInterface {
  name: string;

  operation: string;

  value: number;

  constructor(rankingEvent: Partial<RankingEvent>) {
    super(rankingEvent);
  }
}
