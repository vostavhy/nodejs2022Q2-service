import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  findAll() {
    return `This action returns all album`;
  }

  findOne(id: string) {
    return `This action returns a #${id} album`;
  }

  create(createAlbumDto: CreateAlbumDto) {
    return 'This action adds a new album';
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return `This action updates a #${id} album`;
  }

  remove(id: string) {
    return `This action removes a #${id} album`;
  }
}
