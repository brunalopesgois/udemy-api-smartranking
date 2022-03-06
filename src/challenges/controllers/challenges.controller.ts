import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateChallengeDto } from '../dtos/create-challenge.dto';
import { ChallengesService } from '../services/challenges.service';

@Controller('v1/challenges')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Get()
  async index(@Query('player') playerId: string) {
    return this.challengesService.findAll(playerId);
  }

  @Post()
  async store(@Body() createChallengeDto: CreateChallengeDto): Promise<void> {
    return this.challengesService.create(createChallengeDto);
  }
}
