import { Artist } from 'src/artist/entities/artist.entity';
import { Favorite } from 'src/favorites/entities/favorite.entity';
import { Track } from 'src/track/entities/track.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Album')
export class Album extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column()
  year: number;

  @ManyToOne(() => Artist, (artist) => artist.albums, { onDelete: 'SET NULL' })
  artist: Artist | null; // refers to Artist

  @ManyToOne(() => Favorite, (favorite) => favorite.albums, {
    onDelete: 'CASCADE',
  })
  favorite: Favorite | null; // refers to Favorite

  @OneToMany(() => Track, (track) => track.album)
  tracks: Track[]; // refers to Tracks

  toResponse() {
    const { id, name, year, artist } = this;
    let artistId = null;
    if (artist) {
      artistId = artist.id;
    }
    return {
      id,
      name,
      year,
      artistId,
    };
  }
}
