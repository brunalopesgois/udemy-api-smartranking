import { PlayerInterface } from './../interfaces/player.interface';

export class Player implements PlayerInterface {
  id: string;

  phone: string;

  email: string;

  name: string;

  ranking: string;

  rankingPosition: number;

  playerPictureUrl: string;

  constructor(player: Partial<Player>) {
    this.id = player.id;
    this.phone = player.phone;
    this.email = player.email;
    this.name = player.name;
    this.ranking = player.ranking;
    this.rankingPosition = player.rankingPosition;
    this.playerPictureUrl = player.playerPictureUrl;
  }
}
