import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { DBService } from 'src/db/db.service';
import { Track } from 'src/track/entities/track.entity';
import { TrackService } from 'src/track/track.service';
import { FavoritesResponse, FavoritesType } from './dto/favorites-response-dto';

@Injectable()
export class FavoritesService {
  constructor(
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    private db: DBService,
  ) {}

  findAll(): FavoritesResponse {
    const favorites: FavoritesResponse = {
      artists: this.artistService.findAll(),
      albums: this.albumService.findAll(),
      tracks: this.trackService.findAll(),
    };
    return favorites;
  }

  addTrack(id: string): Track {
    const found = this.trackService.getOne(id);
    if (!found) {
      throw new UnprocessableEntityException();
    }
    const { tracks } = this.db.favorites;
    tracks.push(found.id);
    return found;
  }

  removeTrack(id: string) {
    let tracks = this.db.favorites.tracks;
    const found = tracks.find((tracksID) => tracksID === id);
    if (!found) {
      throw new NotFoundException();
    }
    tracks = tracks.filter((tracksID) => tracksID !== id);
  }

  addAlbum(id: string) {
    const found = this.albumService.getOne(id);
    if (!found) {
      throw new UnprocessableEntityException();
    }
    const { albums } = this.db.favorites;
    albums.push(found.id);
  }

  removeAlbum(id: string) {
    let albums = this.db.favorites.albums;
    const found = albums.find((albumsID) => albumsID === id);
    if (!found) {
      throw new NotFoundException();
    }

    albums = albums.filter((albumsID) => albumsID !== id);
  }

  addArtist(id: string) {
    const found = this.artistService.getOne(id);
    if (!found) {
      throw new UnprocessableEntityException();
    }
    const { artists } = this.db.favorites;
    artists.push(found.id);
  }

  removeArtist(id: string) {
    let artists = this.db.favorites.artists;
    const found = artists.find((artistID) => artistID === id);
    if (!found) {
      throw new NotFoundException();
    }
    artists = artists.filter((artistID) => artistID !== id);
  }

  private getId(id: string, type: FavoritesType): string | undefined {
    const favorites = this.db.favorites[type];
    return favorites.find((favoriteID) => favoriteID === id);
  }

  removeArtistSafe(id: string) {
    const artistID = this.getId(id, FavoritesType.artists);
    if (artistID) {
      this.removeArtist(id);
    }
  }

  removeAlbumSafe(id: string) {
    const albumID = this.getId(id, FavoritesType.albums);
    if (albumID) {
      this.removeAlbum(id);
    }
  }

  removeTrackSafe(id: string) {
    const trackID = this.getId(id, FavoritesType.tracks);
    if (trackID) {
      this.removeTrack(id);
    }
  }
}
