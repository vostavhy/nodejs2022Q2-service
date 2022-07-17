import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { v4 as uuid } from 'uuid';
import { dbService } from 'src/db/db.service';

@Injectable()
export class AlbumService {
  private albums: Album[] = dbService.albums;

  findAll() {
    return this.albums;
  }

  findOne(id: string): Album {
    const found = this.albums.find((album) => album.id === id);
    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  findOne422(id: string): Album {
    const found = this.albums.find((album) => album.id === id);
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

    this.albums.push(album);

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
    this.albums = this.albums.filter((album) => album.id !== id);
    return found;
  }
}
