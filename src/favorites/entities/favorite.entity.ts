import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { BaseEntity, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Favorite')
export class Favorite extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number; // uuid v4

  @OneToMany(() => Track, (track) => track.favorite, { cascade: true })
  tracks: Track[]; // refers to Tracks

  @OneToMany(() => Album, (album) => album.favorite, { cascade: true })
  albums: Album[]; // refers to Albums

  @OneToMany(() => Artist, (artist) => artist.favorite, { cascade: true })
  artists: Artist[]; // refers to Artists

  toResponse() {
    const { tracks, albums, artists } = this;

    let resTracks = [];
    if (tracks) {
      resTracks = tracks.map((track) => track.toResponse());
    }

    let resAlbums = [];
    if (albums) {
      resAlbums = albums.map((album) => album.toResponse());
    }

    let resArtists = [];
    if (artists) {
      resArtists = artists.map((artist) => artist.toResponse());
    }

    return {
      tracks: resTracks,
      albums: resAlbums,
      artists: resArtists,
    };
  }
}
