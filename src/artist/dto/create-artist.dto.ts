import { IsNotEmpty } from 'class-validator';

export class CreateArtistDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  grammy: boolean;
}
