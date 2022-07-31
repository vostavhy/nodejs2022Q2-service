import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from 'src/artist/entities/artist.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
  ) {}

  async findAll() {
    return await this.albumRepository.find();
  }

  async findOne(id: string): Promise<Album> {
    const found = this.getOne(id);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const { artistId } = createAlbumDto;
    const createdAlbum = this.albumRepository.create(createAlbumDto);
    if (artistId) {
      createdAlbum.artist = await Artist.findOneBy({ id: artistId });
    } else {
      createdAlbum.artist = null;
    }
    await this.albumRepository.save(createdAlbum);
    return createdAlbum;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const { name, year, artistId } = updateAlbumDto;
    const album = await this.getOne(id);
    album.name = name;
    album.year = year;
    if (artistId) album.artist = await Artist.findOneBy({ id: artistId });
    await this.albumRepository.save(album);
    return album;
  }

  async remove(id: string): Promise<Album> {
    const found = this.getOne(id);
    await this.albumRepository.delete(id);
    return found;
  }

  //removeArtist(artistId: string) {
  //  const albums = this.db.albums.filter(
  //    (album) => album.artistId === artistId,
  //  );
  //  albums.forEach((album) => {
  //    album.artistId = null;
  //  });
  //}

  private async getOne(id: string): Promise<Album> {
    const found = await this.albumRepository.findOneBy({ id: id });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }
}
