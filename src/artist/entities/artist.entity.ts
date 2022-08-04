import { Album } from 'src/album/entities/album.entity';
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

@Entity('Artist')
export class Artist extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => Track, (tracks) => tracks.artist)
  tracks: Track[];

  @OneToMany(() => Album, (albums) => albums.artist)
  albums: Album[];

  @ManyToOne(() => Favorite, (favorite) => favorite.artists, {
    onDelete: 'CASCADE',
  })
  favorite: Favorite | null; // refers to Favorite

  toResponse() {
    const { id, name, grammy } = this;
    return {
      id,
      name,
      grammy,
    };
  }
}
