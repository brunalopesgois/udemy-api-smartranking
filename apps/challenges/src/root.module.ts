import { Module } from '@nestjs/common';
import { ChallengesModule } from './challenges/modules/challenges.module';

@Module({
  imports: [ChallengesModule],
  controllers: [],
  providers: [],
})
export class RootModule {}
