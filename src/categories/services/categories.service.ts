import { AddCategoryPlayerDto } from './../dtos/add-category-player.dto';
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
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CategoriesService {
  private readonly logger: Logger;

  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
    private readonly httpService: HttpService,
  ) {
    this.logger = new Logger(CategoriesService.name);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().populate('players');
  }

  async findById(id: string): Promise<Category> {
    return this.categoryModel.findById(id);
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<void> {
    this.logger.log(`Create category: ${JSON.stringify(createCategoryDto)}`);

    const { category } = createCategoryDto;

    const categoryExists = await this.categoryModel.findOne({ category });

    if (categoryExists) {
      throw new BadRequestException(
        `Category with name ${category} already exists`,
      );
    }

    const categoryEntity = new this.categoryModel(createCategoryDto);

    try {
      categoryEntity.save();
    } catch (error) {
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
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    const sameNameCategory = await this.categoryModel.findOne({ category });

    if (sameNameCategory && categoryEntity != sameNameCategory) {
      throw new BadRequestException(
        `Cannot save category with name ${category}. Already exists`,
      );
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
      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(id: string): Promise<void> {
    this.logger.log(`Remove category with id: ${id}`);

    const category: Category = await this.findById(id);

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    try {
      this.categoryModel.deleteOne({ _id: id }).exec();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

    this.logger.log(`Category removed`);
  }

  async includePlayerInCategory(
    id: string,
    addCategoryPlayerDto: AddCategoryPlayerDto,
  ): Promise<void> {
    const category = await this.findById(id);

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    const { playerId } = addCategoryPlayerDto;

    const player = await firstValueFrom(
      this.httpService.get(`http://localhost:8080/api/v1/players/${playerId}`),
    );

    if (!player.data) {
      throw new NotFoundException(`Player with id ${id} not found`);
    }

    const playerInCategory = await this.categoryModel
      .find({ _id: id })
      .where('players')
      .in(player.data._id);

    if (playerInCategory.length > 0) {
      throw new NotFoundException(
        `Player with id ${id} already exists in category ${category.category}`,
      );
    }

    category.players.push(player.data._id);

    try {
      await this.categoryModel.findByIdAndUpdate(
        { _id: id },
        { $set: category },
      );
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
