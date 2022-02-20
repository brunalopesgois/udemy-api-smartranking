import { Module } from '@nestjs/common';
import { PlayersModule } from './players/modules/players.module';

@Module({
  imports: [PlayersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
