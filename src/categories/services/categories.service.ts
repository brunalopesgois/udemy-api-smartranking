import { UpdateCategoryDto } from './../dtos/update-category.dto';
import { CreateCategoryDto } from './../dtos/create-category.dto';
import {
  Injectable,
  BadRequestException,
  Logger,
  InternalServerErrorException,
  NotFoundException,
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

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    this.logger.log(`Update category: ${JSON.stringify(updateCategoryDto)}`);

    const { category } = updateCategoryDto;

    let categoryEntity: Category = await this.findById(id);

    if (!categoryEntity) {
      const message = `Category with id ${id} not found`;
      this.logger.error(message);

      throw new NotFoundException(message);
    }

    const sameNameCategory = await this.categoryModel.findOne({ category });

    if (sameNameCategory && categoryEntity != sameNameCategory) {
      const message = `Cannot save category with name ${category}. Already exists`;
      this.logger.error(message);

      throw new BadRequestException(message);
    }

    try {
      categoryEntity = await this.categoryModel.findByIdAndUpdate(
        { _id: id },
        { $set: updateCategoryDto },
        { new: true },
      );

      this.logger.log(`Updated category: ${categoryEntity}`);

      return categoryEntity;
    } catch (error) {
      this.logger.error(error.message);

      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(id: string): Promise<void> {
    this.logger.log(`Remove category with id: ${id}`);

    const category: Category = await this.findById(id);

    if (!category) {
      const message = `Category with id ${id} not found`;
      this.logger.error(message);

      throw new NotFoundException(message);
    }

    try {
      this.categoryModel.deleteOne({ _id: id }).exec();
    } catch (error) {
      this.logger.error(error.message);

      throw new InternalServerErrorException(error.message);
    }

    this.logger.log(`Category removed`);
  }
}
