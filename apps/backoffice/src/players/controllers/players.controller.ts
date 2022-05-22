import { UpdatePlayerDto } from '../dtos/update-player.dto';
import { PlayersService } from '../services/players.service';
import { CreatePlayerDto } from '../dtos/create-player.dto';
import { Player } from '../entities/player.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  HttpStatus,
} from '@nestjs/common';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get()
  async index(): Promise<Player[]> {
    return this.playersService.findAll();
  }

  @Get(':id')
  async show(@Param('id') id: string): Promise<Player> {
    return this.playersService.findById(id);
  }

  @Post()
  async store(@Body() createPlayerDto: CreatePlayerDto): Promise<void> {
    await this.playersService.create(createPlayerDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePlayerDto: UpdatePlayerDto,
  ): Promise<Player> {
    return this.playersService.update(id, updatePlayerDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: string): Promise<void> {
    return this.playersService.delete(id);
  }
}
