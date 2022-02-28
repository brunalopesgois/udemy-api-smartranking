import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from './players/modules/players.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://root:root@apismartrankingcluster.otrih.mongodb.net/smartranking?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    ),
    PlayersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
