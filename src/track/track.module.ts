import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { DbModule } from 'src/db/db.module';
import { FavoritesModule } from 'src/favorites/favorites.module';

@Module({
  imports: [FavoritesModule, DbModule],
  exports: [TrackService],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
