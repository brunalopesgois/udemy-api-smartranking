import { AddCategoryPlayerDto } from './../dtos/add-category-player.dto';
import { UpdateCategoryDto } from './../dtos/update-category.dto';
import { CreateCategoryDto } from './../dtos/create-category.dto';
import { CategoriesService } from './../services/categories.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Category } from '../entities/categories/category.entity';

@Controller('v1/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async index(@Query('player') playerId: string): Promise<Category[]> {
    return this.categoriesService.findAll(playerId);
  }

  @Get(':id')
  async show(@Param('id') id: string): Promise<Category> {
    return this.categoriesService.findById(id);
  }

  @Post()
  async store(@Body() createCategoryDto: CreateCategoryDto): Promise<void> {
    return this.categoriesService.create(createCategoryDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: string): Promise<void> {
    return this.categoriesService.delete(id);
  }

  @Post(':id/players')
  async storePlayer(
    @Param('id') id: string,
    @Body() addCategoryPlayerDto: AddCategoryPlayerDto,
  ) {
    return this.categoriesService.includePlayerInCategory(
      id,
      addCategoryPlayerDto,
    );
  }
}
