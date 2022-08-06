import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { DBService } from 'src/db/db.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Artist]), AuthModule],
  exports: [ArtistService],
  controllers: [ArtistController],
  providers: [ArtistService, DBService],
})
export class ArtistModule {}
