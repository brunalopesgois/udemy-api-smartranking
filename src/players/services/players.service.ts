import { UpdatePlayerDto } from './../dtos/update-player.dto';
import { Player } from './../entities/player.entity';
import { CreatePlayerDto } from './../dtos/create-player.dto';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
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

  async findById(id: string): Promise<Player> {
    const player = this.players.find((playerObj) => playerObj.id === id);

    return player;
  }

  async create(createPlayerDto: CreatePlayerDto): Promise<void> {
    this.logger.log(`Create player: ${JSON.stringify(createPlayerDto)}`);

    const { phone, email, name } = createPlayerDto;

    const playerExists = this.players.find((player) => player.email === email);

    if (playerExists) {
      const message = `Player with email ${email} already exists`;
      this.logger.error(message);

      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }

    const player: Player = new Player({
      id: uuidv4(),
      phone: phone,
      email: email,
      name: name,
      ranking: 'A',
      rankingPosition: 1,
      playerPictureUrl: 'www.google.com.br/foto123.jpg',
    });

    try {
      this.players.push(player);
    } catch (error) {
      this.logger.error(error.message);

      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    this.logger.log(`Created player: ${JSON.stringify(player)}`);
  }

  async update(id: string, updatePlayerDto: UpdatePlayerDto): Promise<Player> {
    this.logger.log(`Update player: ${JSON.stringify(updatePlayerDto)}`);

    const player: Player = await this.findById(id);

    if (!player) {
      const message = `Player with id ${id} not found`;
      this.logger.error(message);

      throw new HttpException(message, HttpStatus.NOT_FOUND);
    }

    const { phone, email, name } = updatePlayerDto;

    const updatedPlayer = new Player({
      id: player.id,
      phone: phone,
      email: email,
      name: name,
      ranking: player.ranking,
      rankingPosition: player.rankingPosition,
      playerPictureUrl: player.playerPictureUrl,
    });

    Object.assign(player, updatedPlayer);

    this.logger.log(`Updated player: ${player}`);

    return player;
  }

  async delete(id: string): Promise<void> {
    this.logger.log(`Remove player: todo`);

    const player: Player = await this.findById(id);

    if (!player) {
      const message = `Player with id ${id} not found`;
      this.logger.error(message);

      throw new HttpException(message, HttpStatus.NOT_FOUND);
    }

    try {
      this.players = this.players.filter((player) => player.id !== id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    this.logger.log(`Player removed`);
  }
}
