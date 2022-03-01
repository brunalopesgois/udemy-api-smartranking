import { UpdatePlayerDto } from './../dtos/update-player.dto';
import { Player } from './../entities/player.entity';
import { CreatePlayerDto } from './../dtos/create-player.dto';
import {
  Injectable,
  Logger,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {
  private readonly logger: Logger;

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

      throw new BadRequestException(message);
    }

    const player = new this.playerModel(createPlayerDto);

    try {
      player.save();
    } catch (error) {
      this.logger.error(error.message);

      throw new InternalServerErrorException(error.message);
    }

    this.logger.log(`Created player: ${JSON.stringify(player)}`);
  }

  async update(id: string, updatePlayerDto: UpdatePlayerDto): Promise<Player> {
    this.logger.log(`Update player: ${JSON.stringify(updatePlayerDto)}`);

    let player: Player = await this.findById(id);

    if (!player) {
      const message = `Player with id ${id} not found`;
      this.logger.error(message);

      throw new NotFoundException(message);
    }

    try {
      player = await this.playerModel.findByIdAndUpdate(
        { _id: id },
        { $set: updatePlayerDto },
        { new: true },
      );

      this.logger.log(`Updated player: ${player}`);

      return player;
    } catch (error) {
      this.logger.error(error.message);

      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(id: string): Promise<void> {
    this.logger.log(`Remove player with id: ${id}`);

    const player: Player = await this.findById(id);

    if (!player) {
      const message = `Player with id ${id} not found`;
      this.logger.error(message);

      throw new NotFoundException(message);
    }

    try {
      this.playerModel.deleteOne({ _id: id }).exec();
    } catch (error) {
      this.logger.error(error.message);

      throw new InternalServerErrorException(error.message);
    }

    this.logger.log(`Player removed`);
  }
}
