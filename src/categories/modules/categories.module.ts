import { CategorySchema } from './../schemas/category.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesService } from './../services/categories.service';
import { CategoriesController } from './../controllers/categories.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Category',
        schema: CategorySchema,
      },
    ]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
