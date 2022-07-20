import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { v4 as uuid } from 'uuid';
import { DBService } from 'src/db/db.service';

@Injectable()
export class AlbumService {
  constructor(private db: DBService) {}

  findAll() {
    return this.db.albums;
  }

  findOne(id: string): Album {
    const found = this.db.albums.find((album) => album.id === id);
    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  findOne422(id: string): Album {
    const found = this.db.albums.find((album) => album.id === id);
    if (!found) {
      throw new UnprocessableEntityException();
    }

    return found;
  }

  create(createAlbumDto: CreateAlbumDto): Album {
    const { name, year, artistId } = createAlbumDto;
    const album = {
      id: uuid(),
      name,
      year,
      artistId,
    };

    this.db.albums.push(album);

    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Album {
    const { name, year, artistId } = updateAlbumDto;
    const album = this.findOne(id);
    album.name = name;
    album.year = year;
    album.artistId = artistId;
    return album;
  }

  remove(id: string): Album {
    const found = this.findOne(id);
    this.db.albums = this.db.albums.filter((album) => album.id !== id);
    return found;
  }
}
