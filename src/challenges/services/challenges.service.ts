import { firstValueFrom } from 'rxjs';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Challenge } from '../entities/challenge.entity';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { CreateChallengeDto } from '../dtos/create-challenge.dto';
import { ChallengeStatus } from './../../shared/enums/challenges/challenge-status.enum';

@Injectable()
export class ChallengesService {
  private readonly logger: Logger;

  constructor(
    @InjectModel('Challenge') private readonly challengeModel: Model<Challenge>,
    private readonly httpService: HttpService,
  ) {
    this.logger = new Logger(ChallengesService.name);
  }

  async findAll(playerId?: string): Promise<Challenge[]> {
    if (playerId) {
      return this.challengeModel
        .find({ players: { _id: playerId } })
        .populate('players');
    }

    return this.challengeModel.find();
  }

  async create(createChallengeDto: CreateChallengeDto): Promise<void> {
    this.logger.log(`Create challenge: ${JSON.stringify(createChallengeDto)}`);

    const { requester, players } = createChallengeDto;

    if (requester._id != players[0]._id && requester._id != players[1]._id) {
      throw new BadRequestException('One of the players must be the requester');
    }

    await this.validatePlayers(players);

    const category = await firstValueFrom(
      this.httpService.get(
        `http://localhost:8080/api/v1/categories?player=${requester._id}`,
      ),
    );

    if (!category.data) {
      throw new BadRequestException('The requester must have a category');
    }

    const challengeEntity = new this.challengeModel({
      ...createChallengeDto,
      category: category.data.category,
      requestDateTime: new Date(),
      status: ChallengeStatus.PENDING,
    });

    try {
      challengeEntity.save();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

    this.logger.log(`Created category: ${JSON.stringify(challengeEntity)}`);
  }

  private async validatePlayers(players): Promise<void> {
    const player1 = await firstValueFrom(
      this.httpService.get(
        `http://localhost:8080/api/v1/players/${players[0]._id}`,
      ),
    );

    if (!player1) {
      throw new NotFoundException(
        `The player with id ${players[0]._id} does not exist`,
      );
    }

    const player2 = await firstValueFrom(
      this.httpService.get(
        `http://localhost:8080/api/v1/players/${players[1]._id}`,
      ),
    );

    if (!player2) {
      throw new NotFoundException(
        `The player with id ${players[1]._id} does not exist`,
      );
    }
  }
}
