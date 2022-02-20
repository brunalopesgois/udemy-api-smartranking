import { PlayersService } from './../services/players.service';
import { CreatePlayerDto } from './../dtos/create-player.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Player } from '../interfaces/player.interface';

@Controller('v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get()
  async index(): Promise<Player[]> {
    return this.playersService.findAll();
  }

  @Post()
  async store(@Body() createPlayerDto: CreatePlayerDto): Promise<void> {
    await this.playersService.create(createPlayerDto);
  }
}
