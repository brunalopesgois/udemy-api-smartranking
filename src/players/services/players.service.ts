import { CreatePlayerDto } from './../dtos/create-player.dto';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Player } from '../interfaces/player.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PlayersService {
  private readonly logger: Logger;

  private players: Player[];

  constructor() {
    this.players = [];
    this.logger = new Logger(PlayersService.name);
  }

  async findAll(): Promise<Player[]> {
    return this.players;
  }

  async create(createPlayerDto: CreatePlayerDto): Promise<void> {
    this.logger.log(`Create player: ${JSON.stringify(createPlayerDto)}`);

    const { phone, email, name } = createPlayerDto;

    const player: Player = {
      id: uuidv4(),
      phone: phone,
      email: email,
      name: name,
      ranking: 'A',
      rankingPosition: 1,
      playerPictureUrl: 'www.google.com.br/foto123.jpg',
    };

    try {
      this.players.push(player);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    this.logger.log(`Created player: ${JSON.stringify(player)}`);
  }
}
