import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { DBService } from 'src/db/db.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Artist])],
  exports: [ArtistService],
  controllers: [ArtistController],
  providers: [ArtistService, DBService],
})
export class ArtistModule {}
