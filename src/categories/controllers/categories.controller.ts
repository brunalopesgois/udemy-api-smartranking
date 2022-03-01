import { CategoriesService } from './../services/categories.service';
import { Controller, Get } from '@nestjs/common';

@Controller('v1/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async index() {
    return this.categoriesService.findAll();
  }
}
