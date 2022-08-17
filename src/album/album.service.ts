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
    const albums = await this.albumRepository.find({
      relations: {
        artist: true,
      },
    });
    return albums.map((album) => album.toResponse());
  }

  async findOne(id: string) {
    const found = await this.getOne(id);
    if (!found) {
      throw new NotFoundException();
    }
    //console.log(found);
    //console.log(found.artist);
    return found.toResponse();
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
    //console.log(createdAlbum.toResponse());
    //console.log(createdAlbum);
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
    const found = await this.albumRepository.findOne({
      where: { id: id },
      relations: {
        artist: true,
      },
    });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }
}
