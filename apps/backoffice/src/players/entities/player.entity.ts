import { PlayerInterface } from '@sr-backoffice/backoffice-domain';
import { Document } from 'mongoose';

export class Player extends Document implements PlayerInterface {
  readonly _id: string;

  phone: string;

  email: string;

  name: string;

  ranking: string;

  rankingPosition: number;

  playerPictureUrl: string;

  constructor(player: Partial<Player>) {
    super(player);
  }
}
