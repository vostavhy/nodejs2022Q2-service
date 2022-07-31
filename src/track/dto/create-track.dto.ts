import { IsNotEmpty, IsNumber, IsString } from '@nestjs/class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  duration: number; // integer number

  @IsString()
  artistId: string | null;

  @IsString()
  albumId: string | null;
}
