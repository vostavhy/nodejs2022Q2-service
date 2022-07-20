import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { DBService } from 'src/db/db.service';
import { DbModule } from 'src/db/db.module';
import { TrackModule } from 'src/track/track.module';
import { AlbumModule } from 'src/album/album.module';

@Module({
  imports: [DbModule, TrackModule, AlbumModule],
  exports: [ArtistService],
  controllers: [ArtistController],
  providers: [ArtistService, DBService],
})
export class ArtistModule {}
