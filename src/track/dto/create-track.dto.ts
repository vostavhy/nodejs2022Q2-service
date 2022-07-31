import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateIf,
} from '@nestjs/class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  duration: number; // integer number

  @ValidateIf((o) => o.artistId !== null)
  @IsString()
  artistId: string | null;

  @ValidateIf((o) => o.albumId !== null)
  @IsString()
  albumId: string | null;
}
