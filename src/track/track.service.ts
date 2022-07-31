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
    //private readonly favoritesService: FavoritesService,
    //private db: DBService,
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  async findAll(): Promise<Track[]> {
    const tracks = await this.trackRepository.find();
    return tracks;
  }

  async findOne(id: string) {
    const found = await this.getOne(id);
    return found;
  }

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const { artistId, albumId } = createTrackDto;
    const createdTrack = this.trackRepository.create(createTrackDto);
    createdTrack.artist = await Artist.findOneBy({ id: artistId });
    createdTrack.album = await Album.findOneBy({ id: albumId });
    await this.trackRepository.save(createdTrack);
    return createdTrack;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    const { name, duration, artistId, albumId } = updateTrackDto;
    const updatedTrack: Track = await this.getOne(id);
    updatedTrack.name = name;
    updatedTrack.duration = duration;
    updatedTrack.artist = await Artist.findOneBy({ id: artistId });
    updatedTrack.album = await Album.findOneBy({ id: albumId });
    await this.trackRepository.save(updatedTrack);
    return updatedTrack;
  }

  async remove(id: string): Promise<Track> {
    const found: Track = await this.getOne(id);
    await this.trackRepository.delete(id);
    return found;
  }

  //removeArtist(artistId: string) {
  //  const tracks = this.db.tracks.filter(
  //    (track) => track.artistId === artistId,
  //  );
  //  tracks.forEach((track) => {
  //    track.artistId = null;
  //  });
  //}

  //removeAlbum(albumId: string) {
  //  const tracks = this.db.tracks.filter((track) => track.albumId === albumId);
  //  tracks.forEach((track) => {
  //    track.albumId = null;
  //  });
  //}

  private async getOne(id: string): Promise<Track> {
    const found = await this.trackRepository.findOneBy({ id: id });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }
}
