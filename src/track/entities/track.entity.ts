import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Favorite } from 'src/favorites/entities/favorite.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Track')
export class Track extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column()
  duration: number; // integer number

  @ManyToOne(() => Artist, (artist) => artist.tracks, { onDelete: 'SET NULL' })
  artist: Artist | null; // refers to Artist

  @ManyToOne(() => Album, (album) => album.tracks, { onDelete: 'SET NULL' })
  album: Album | null; // refers to Album

  @ManyToOne(() => Favorite, (favorite) => favorite.tracks, {
    onDelete: 'CASCADE',
  })
  favorite: Favorite | null; // refers to Favorite

  toResponse() {
    const { id, name, duration, artist, album } = this;
    let artistId = null;
    if (artist) {
      artistId = artist.id;
    }
    let albumId = null;
    if (albumId) {
      albumId = album.id;
    }
    return {
      id,
      name,
      duration,
      artistId,
      albumId,
    };
  }
}
