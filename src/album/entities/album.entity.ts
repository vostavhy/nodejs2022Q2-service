import { IsInt, IsOptional, IsString } from 'class-validator';

export class Album {
  id: string; // uuid v4

  @IsString()
  name: string;

  @IsInt()
  year: number;

  @IsOptional()
  @IsString()
  artistId: string | null; // refers to Artist
}
