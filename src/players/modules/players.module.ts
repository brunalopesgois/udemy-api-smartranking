import { PlayersService } from './../services/players.service';
import { Module } from '@nestjs/common';
import { PlayersController } from '../controllers/players.controller';

@Module({
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayersModule {}
