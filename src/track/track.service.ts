import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { v4 as uuid } from 'uuid';
import { dbService } from 'src/db/db.service';

@Injectable()
export class TrackService {
  private tracks: Track[] = dbService.tracks;

  findAll(): Track[] {
    return this.tracks;
  }

  findOne(id: string): Track {
    const found = this.tracks.find((track) => track.id === id);
    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  findOne422(id: string): Track {
    const found = this.tracks.find((track) => track.id === id);
    if (!found) {
      throw new UnprocessableEntityException();
    }

    return found;
  }

  create(createTrackDto: CreateTrackDto): Track {
    const track: Track = {
      id: uuid(),
      ...createTrackDto,
    };
    this.tracks.push(track);

    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Track {
    let found: Track = this.findOne(id);
    found = {
      id: found.id,
      ...updateTrackDto,
    };
    return found;
  }

  remove(id: string): Track {
    const found: Track = this.findOne(id);
    this.tracks = this.tracks.filter((track) => track.id !== id);
    return found;
  }
}
