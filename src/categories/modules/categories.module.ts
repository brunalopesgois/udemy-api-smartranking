import { CategoriesService } from './../services/categories.service';
import { CategoriesController } from './../controllers/categories.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
