import { IsNumber, IsString, MinLength } from 'class-validator';

export class CreateOffersHotelDto {
  @IsString({ message: 'Name must be a string' })
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  name: string;
  @IsNumber({}, { message: 'Rating must be a number' })
  rating: number;
  @IsNumber({}, { message: 'counters must be a number' })
  counters: number;
  @MinLength(3, { message: 'image must be at least 3 characters long' })
  @IsString({ message: 'image must be a string' })
  image: string;
  @MinLength(3, { message: 'description must be at least 3 characters long' })
  @IsString({ message: 'description must be a string' })
  description: string;
}
