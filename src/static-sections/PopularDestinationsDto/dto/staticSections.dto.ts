import { IsString, MaxLength, MinLength } from 'class-validator';

export class createPopularDestinationsDto {
  @IsString({ message: 'titleAr must be a string' })
  @MinLength(3, { message: 'titleAr must be at least 3 characters' })
  @MaxLength(50, { message: 'titleAr must be at most 50 characters' })
  titleAR: string;
  @MaxLength(50, { message: 'titleAr must be at most 50 characters' })
  @MinLength(3, { message: 'titleAr must be at least 3 characters' })
  @IsString({ message: 'titleEn must be a string' })
  titleEN: string;
  // @IsString({ message: 'url img must be a string' })
  img: string;
}
