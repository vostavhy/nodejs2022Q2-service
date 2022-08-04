import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  private fvEntity: Favorite;
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
  ) {}

  async findAll() {
    await this.createFavoritesInstance();
    // console.log(this.fvEntity);
    return this.fvEntity.toResponse();
  }

  async addTrack(id: string) {
    await this.createFavoritesInstance();
    const found: Track = await Track.findOne({
      where: { id },
      relations: { artist: true, album: true },
    });
    if (!found) {
      throw new UnprocessableEntityException();
    }
    found.favorite = this.fvEntity;
    await found.save();
    return found.toResponse();
  }

  async removeTrack(id: string) {
    await this.createFavoritesInstance();
    const found = await Track.findOneBy({ id });
    if (!found) {
      throw new NotFoundException();
    }
    found.favorite = null;
    await found.save();
    return found.toResponse();
  }

  async addAlbum(id: string) {
    await this.createFavoritesInstance();
    const found = await Album.findOne({
      where: { id },
      relations: {
        artist: true,
      },
    });
    if (!found) {
      throw new UnprocessableEntityException();
    }
    found.favorite = this.fvEntity;
    await found.save();
    return found.toResponse();
  }

  async removeAlbum(id: string) {
    await this.createFavoritesInstance();
    const found = await Album.findOneBy({ id });
    if (!found) {
      throw new NotFoundException();
    }
    found.favorite = null;
    await found.save();
    return found.toResponse();
  }

  async addArtist(id: string) {
    await this.createFavoritesInstance();
    const found = await Artist.findOneBy({ id });
    if (!found) {
      throw new UnprocessableEntityException();
    }
    found.favorite = this.fvEntity;
    await found.save();
    return found.toResponse();
  }

  async removeArtist(id: string) {
    await this.createFavoritesInstance();
    const found = await Artist.findOneBy({ id });
    if (!found) {
      throw new NotFoundException();
    }
    found.favorite = null;
    await found.save();
    return found.toResponse();
  }

  private async createFavoritesInstance() {
    // if no favorites entity, we create one
    const favorites = await this.favoriteRepository.find({
      relations: {
        tracks: true,
        albums: true,
        artists: true,
      },
    });
    if (favorites.length === 0) {
      this.fvEntity = this.favoriteRepository.create();
      await this.fvEntity.save();
    } else {
      this.fvEntity = favorites[0];
    }
    console.log(favorites[0] === this.fvEntity);
  }
}
