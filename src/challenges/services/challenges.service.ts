import { Injectable } from '@nestjs/common';

@Injectable()
export class ChallengesService {
  async findAll() {
    return 'desafios';
  }
}
