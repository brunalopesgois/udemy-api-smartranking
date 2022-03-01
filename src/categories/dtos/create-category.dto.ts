import { RankingEvent } from '../entities/events/event.entity';
import { ArrayMinSize, IsArray, IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  description: string;

  @IsArray()
  @ArrayMinSize(1)
  rankingEvents: RankingEvent[];
}