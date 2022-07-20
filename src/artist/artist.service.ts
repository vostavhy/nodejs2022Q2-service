import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { v4 as uuid } from 'uuid';
import { DBService } from 'src/db/db.service';

@Injectable()
export class ArtistService {
  constructor(private db: DBService) {}

  findAll() {
    return this.db.artists;
  }

  findOne(id: string): Artist {
    const found = this.db.artists.find((artist) => artist.id === id);
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

    this.db.artists.push(artist);
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist {
    const found = this.findOne(id);
    const { name, grammy } = updateArtistDto;

    found.name = name;

    found.grammy = grammy;

    return found;
  }

  remove(id: string): Artist {
    const found = this.findOne(id);
    this.db.artists = this.db.artists.filter((artist) => artist.id !== id);
    return found;
  }
}
