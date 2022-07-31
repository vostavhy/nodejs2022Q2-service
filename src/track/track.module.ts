import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
//import { FavoritesModule } from 'src/favorites/favorites.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Track])],
  exports: [TrackService],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
