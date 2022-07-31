import { IsInt, IsString, ValidateIf } from '@nestjs/class-validator';

export class CreateAlbumDto {
  @IsString()
  name: string;

  @IsInt()
  year: number;

  @ValidateIf((o) => o.artistId !== null)
  @IsString()
  artistId: string | null; // refers to Artist
}
