import { Injectable } from '@nestjs/common';

import { User } from 'src/user/entities/user.entity';
import { Track } from 'src/track/entities/track.entity';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';

@Injectable()
export class DBService {
  public artists: Artist[] = [];
  public users: User[] = [];
  public albums: Album[] = [];
  public tracks: Track[] = [];
  public favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };
}
