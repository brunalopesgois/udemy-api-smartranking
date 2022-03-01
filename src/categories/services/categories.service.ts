import { CreateCategoryDto } from './../dtos/create-category.dto';
import {
  Injectable,
  BadRequestException,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from '../entities/categories/category.entity';
import { Model } from 'mongoose';

@Injectable()
export class CategoriesService {
  private readonly logger: Logger;

  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {
    this.logger = new Logger(CategoriesService.name);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find();
  }

  async findById(id: string): Promise<Category> {
    return this.categoryModel.findById(id);
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<void> {
    this.logger.log(`Create category: ${JSON.stringify(createCategoryDto)}`);

    const { category } = createCategoryDto;

    const categoryExists = await this.categoryModel.findOne({ category });

    if (categoryExists) {
      const message = `Category with name ${category} already exists`;
      this.logger.error(message);

      throw new BadRequestException(message);
    }

    const categoryEntity = new this.categoryModel(createCategoryDto);

    try {
      categoryEntity.save();
    } catch (error) {
      this.logger.error(error.message);

      throw new InternalServerErrorException(error.message);
    }

    this.logger.log(`Created category: ${JSON.stringify(categoryEntity)}`);
  }
}
