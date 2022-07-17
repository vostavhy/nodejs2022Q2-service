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

  findOne(id: string): Artist {
    const found = this.artists.find((artist) => artist.id === id);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  create(createArtistDto: CreateArtistDto): Artist {
    const { name, grammy } = createArtistDto;
    const artist: Artist = {
      id: uuid(),
      name,
      grammy,
    };

    this.artists.push(artist);
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist {
    const found = this.findOne(id);
    const { name, grammy } = updateArtistDto;
    if (name) {
      found.name = name;
    }

    if (grammy) {
      found.grammy = grammy;
    }

    return found;
  }

  remove(id: string): Artist {
    const found = this.findOne(id);
    this.artists = this.artists.filter((artist) => artist.id !== id);
    return found;
  }
}
