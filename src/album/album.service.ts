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
    const albums = await this.albumRepository.find();
    return albums.map((album) => album.toResponse());
  }

  async findOne(id: string) {
    const found = this.getOne(id);
    if (!found) {
      throw new NotFoundException();
    }
    return (await found).toResponse();
  }

  async create(createAlbumDto: CreateAlbumDto) {
    const { artistId } = createAlbumDto;
    const createdAlbum = this.albumRepository.create(createAlbumDto);

    let artist = null;
    if (artistId) {
      artist = await Artist.findOneBy({ id: artistId });
    }
    createdAlbum.artist = artist;

    await this.albumRepository.save(createdAlbum);
    return createdAlbum.toResponse();
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const { name, year, artistId } = updateAlbumDto;
    const album = await this.getOne(id);
    album.name = name;
    album.year = year;

    if (artistId) {
      album.artist = await Artist.findOneBy({ id: artistId });
    }

    await this.albumRepository.save(album);
    return album.toResponse();
  }

  async remove(id: string) {
    const found = await this.getOne(id);
    await this.albumRepository.delete(id);
    return found.toResponse();
  }

  private async getOne(id: string): Promise<Album> {
    const found = await this.albumRepository.findOneBy({ id: id });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }
}
