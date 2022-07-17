import { Injectable, NotFoundException } from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { dbService } from 'src/db/db.service';
import { Track } from 'src/track/entities/track.entity';
import { TrackService } from 'src/track/track.service';
import { FavoritesResponse } from './dto/favorites-response-dto';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  private favorites: Favorite = dbService.favorites;

  findAll(): FavoritesResponse {
    const favorites: FavoritesResponse = {
      artists: this.artistService.findAll(),
      albums: this.albumService.findAll(),
      tracks: this.trackService.findAll(),
    };
    return favorites;
  }

  addTrack(id: string): Track {
    const found = this.trackService.findOne422(id);
    const { tracks } = this.favorites;
    tracks.push(found.id);
    return found;
  }

  removeTrack(id: string) {
    let tracks = this.favorites.tracks;
    const found = tracks.find((tracksID) => tracksID === id);
    if (!found) {
      throw new NotFoundException();
    }

    tracks = tracks.filter((tracksID) => tracksID !== id);
  }

  addAlbum(id: string) {
    const found = this.albumService.findOne422(id);
    const { albums } = this.favorites;
    albums.push(found.id);
  }

  removeAlbum(id: string) {
    let albums = this.favorites.albums;
    const found = albums.find((albumsID) => albumsID === id);
    if (!found) {
      throw new NotFoundException();
    }

    albums = albums.filter((albumsID) => albumsID !== id);
  }

  addArtist(id: string) {
    const found = this.artistService.findOne422(id);
    const { artists } = this.favorites;
    artists.push(found.id);
  }

  removeArtist(id: string) {
    let artists = this.favorites.artists;
    const found = artists.find((artistID) => artistID === id);
    if (!found) {
      throw new NotFoundException();
    }

    artists = artists.filter((artistID) => artistID !== id);
  }
}
