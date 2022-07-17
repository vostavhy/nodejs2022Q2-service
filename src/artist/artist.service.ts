import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ArtistService {
  artists: Artist[] = [];

  findAll() {
    return this.artists;
  }

  findOne(id: string) {
    const found = this.artists.find((artist) => artist.id === id);

    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  create(createArtistDto: CreateArtistDto) {
    const { name, grammy } = createArtistDto;
    const artist: Artist = {
      id: uuid(),
      name,
      grammy,
    };

    this.artists.push(artist);

    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return `This action updates a #${id} artist`;
  }

  remove(id: string) {
    return `This action removes a #${id} artist`;
  }
}
