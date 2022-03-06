import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateChallengeDto } from '../dtos/create-challenge.dto';
import { Challenge } from '../entities/challenge.entity';
import { ChallengesService } from '../services/challenges.service';

@Controller('v1/challenges')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Get()
  async index(): Promise<Challenge[]> {
    return this.challengesService.findAll();
  }

  @Post()
  async store(@Body() createChallengeDto: CreateChallengeDto): Promise<void> {
    return this.challengesService.create(createChallengeDto);
  }

  @Get('players/:playerId')
  async challengesByPlayer(
    @Param('playerId') playerId: string,
  ): Promise<Challenge[]> {
    return this.challengesService.findByPlayers(playerId);
  }
}
