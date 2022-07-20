import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { v4 as uuid } from 'uuid';
import { DBService } from 'src/db/db.service';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class AlbumService {
  constructor(private db: DBService, private trackService: TrackService) {}

  findAll() {
    return this.db.albums;
  }

  findOne(id: string): Album {
    const found = this.getOne(id);
    if (!found) {
      throw new NotFoundException();
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
    this.trackService.removeAlbum(id);
    return found;
  }

  removeArtist(artistId: string) {
    const albums = this.db.albums.filter(
      (album) => album.artistId === artistId,
    );
    albums.forEach((album) => {
      album.artistId = null;
    });
  }

  getOne(id: string): Album | undefined {
    return this.db.albums.find((album) => album.id == id);
  }
}
