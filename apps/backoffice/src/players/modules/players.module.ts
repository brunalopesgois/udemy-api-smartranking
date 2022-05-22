import { PlayerSchema } from '../schemas/player.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersService } from '../services/players.service';
import { Module } from '@nestjs/common';
import { PlayersController } from '../controllers/players.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Player',
        schema: PlayerSchema,
      },
    ]),
  ],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayersModule {}
