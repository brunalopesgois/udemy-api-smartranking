import { Controller, Get } from '@nestjs/common';
import { ChallengesService } from '../services/challenges.service';

@Controller('v1/challenges')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Get()
  async index() {
    return this.challengesService.findAll();
  }
}
