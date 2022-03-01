import { CreateCategoryDto } from './../dtos/create-category.dto';
import { CategoriesService } from './../services/categories.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Category } from '../entities/categories/category.entity';

@Controller('v1/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async index(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  async show(@Param('id') id: string): Promise<Category> {
    return this.categoriesService.findById(id);
  }

  @Post()
  async store(@Body() createCategoryDto: CreateCategoryDto): Promise<void> {
    return this.categoriesService.create(createCategoryDto);
  }
}
