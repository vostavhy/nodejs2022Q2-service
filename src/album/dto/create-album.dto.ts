import { IsInt, IsNotEmpty, IsString } from '@nestjs/class-validator';

export class CreateAlbumDto {
  @IsString()
  name: string;

  @IsInt()
  year: number;

  @IsString()
  @IsNotEmpty()
  artistId: string | null; // refers to Artist
}
