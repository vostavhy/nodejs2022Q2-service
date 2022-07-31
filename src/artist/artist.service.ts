import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  async findAll() {
    return await this.artistRepository.find();
  }

  async findOne(id: string): Promise<Artist> {
    const found = await this.getOne(id);
    return found;
  }

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const createdArtist = this.artistRepository.create(createArtistDto);
    await this.artistRepository.save(createdArtist);
    return createdArtist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const found = await this.getOne(id);
    const { name, grammy } = updateArtistDto;
    found.name = name;
    found.grammy = grammy;
    await this.artistRepository.save(found);
    return found;
  }

  async remove(id: string): Promise<Artist> {
    const found = await this.getOne(id);
    await this.artistRepository.delete(id);
    return found;
  }

  async getOne(id: string): Promise<Artist> {
    const found = await this.artistRepository.findOneBy({ id: id });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }
}
