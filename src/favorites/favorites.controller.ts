import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async findAll() {
    return await this.favoritesService.findAll();
  }

  @Post('track/:id')
  async addTrack(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.addTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  async removeTrack(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.removeTrack(id);
  }

  @Post('album/:id')
  async addAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.addAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  async removeAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.removeAlbum(id);
  }
  @Post('artist/:id')
  async addArtist(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async removeArtist(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.removeArtist(id);
  }
}
