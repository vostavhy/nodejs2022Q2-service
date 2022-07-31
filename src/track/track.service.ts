import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from 'src/artist/entities/artist.entity';
import { Album } from 'src/album/entities/album.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  async findAll() {
    const tracks = await this.trackRepository.find();
    return tracks.map((track) => track.toResponse());
  }

  async findOne(id: string) {
    const found = await this.getOne(id);
    return found.toResponse();
  }

  async create(createTrackDto: CreateTrackDto) {
    const { artistId, albumId } = createTrackDto;
    const createdTrack = this.trackRepository.create(createTrackDto);

    let artist = null;
    if (artistId) {
      artist = await Artist.findOneBy({ id: artistId });
    }
    createdTrack.artist = artist;

    let album = null;
    if (albumId) {
      album = await Album.findOneBy({ id: albumId });
    }
    createdTrack.album = album;

    return (await this.trackRepository.save(createdTrack)).toResponse();
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const { name, duration, artistId, albumId } = updateTrackDto;
    const updatedTrack: Track = await this.getOne(id);
    updatedTrack.name = name;
    updatedTrack.duration = duration;
    if (artistId) {
      updatedTrack.artist = await Artist.findOneBy({ id: artistId });
    }
    if (albumId) {
      updatedTrack.album = await Album.findOneBy({ id: albumId });
    }

    return (await this.trackRepository.save(updatedTrack)).toResponse();
  }

  async remove(id: string): Promise<Track> {
    const found: Track = await this.getOne(id);
    await this.trackRepository.delete(id);
    return found;
  }

  private async getOne(id: string): Promise<Track> {
    const found = await this.trackRepository.findOneBy({ id: id });

    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }
}
