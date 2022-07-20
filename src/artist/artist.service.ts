import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { v4 as uuid } from 'uuid';
import { DBService } from 'src/db/db.service';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class ArtistService {
  constructor(
    private db: DBService,
    private albumService: AlbumService,
    private trackService: TrackService,

    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}

  findAll() {
    return this.db.artists;
  }

  findOne(id: string): Artist {
    const found = this.getOne(id);
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
    this.albumService.removeArtist(id);
    this.trackService.removeArtist(id);
    this.favoritesService.removeArtistSafe(id);
    return found;
  }

  getOne(id: string): Artist | undefined {
    return this.db.artists.find((artist) => artist.id === id);
  }
}
