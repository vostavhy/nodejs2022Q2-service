import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
  HttpCode,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  async findAll() {
    return await this.artistService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.artistService.findOne(id);
  }

  @Post()
  async create(@Body() createArtistDto: CreateArtistDto) {
    return await this.artistService.create(createArtistDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return await this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.artistService.remove(id);
  }
}
