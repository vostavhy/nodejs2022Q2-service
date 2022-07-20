import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { DBService } from 'src/db/db.service';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  exports: [ArtistService],
  controllers: [ArtistController],
  providers: [ArtistService, DBService],
})
export class ArtistModule {}
