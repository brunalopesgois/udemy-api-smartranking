import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { RootModule } from './root.module';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

async function bootstrap() {
  dotenv.config({
    path: resolve(__dirname, 'src/config/.env').replace('/dist', ''),
  });
  const app = await NestFactory.create(RootModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  app.setGlobalPrefix('/v1/api');
  await app.listen(port);
}
bootstrap();
