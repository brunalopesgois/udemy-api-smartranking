import { UpdatePlayerDto } from './../dtos/update-player.dto';
import { Player } from './../entities/player.entity';
import { CreatePlayerDto } from './../dtos/create-player.dto';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {
  private readonly logger: Logger;

  private players: Player[] = [];

  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {
    this.logger = new Logger(PlayersService.name);
  }

  async findAll(): Promise<Player[]> {
    return this.playerModel.find();
  }

  async findById(id: string): Promise<Player> {
    return this.playerModel.findById(id);
  }

  async create(createPlayerDto: CreatePlayerDto): Promise<void> {
    this.logger.log(`Create player: ${JSON.stringify(createPlayerDto)}`);

    const { email } = createPlayerDto;

    const playerExists = await this.playerModel.findOne({ email });

    if (playerExists) {
      const message = `Player with email ${email} already exists`;
      this.logger.error(message);

      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }

    const player = new this.playerModel(createPlayerDto);

    try {
      player.save();
    } catch (error) {
      this.logger.error(error.message);

      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    this.logger.log(`Created player: ${JSON.stringify(player)}`);
  }

  async update(id: string, updatePlayerDto: UpdatePlayerDto): Promise<Player> {
    this.logger.log(`Update player: ${JSON.stringify(updatePlayerDto)}`);

    try {
      const player = await this.playerModel.findByIdAndUpdate(
        { id },
        { $set: updatePlayerDto },
        { new: true },
      );

      this.logger.log(`Updated player: ${player}`);

      return player;
    } catch (error) {
      this.logger.error(error.message);

      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: string): Promise<void> {
    this.logger.log(`Remove player with id: ${id}`);

    const player: Player = await this.findById(id);

    if (!player) {
      const message = `Player with id ${id} not found`;
      this.logger.error(message);

      throw new HttpException(message, HttpStatus.NOT_FOUND);
    }

    try {
      this.playerModel.deleteOne({ id }).exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    this.logger.log(`Player removed`);
  }
}
