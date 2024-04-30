import { IsEmail, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateCustomerDto {
  @IsString({ message: 'Name must be a string' })
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  name: string;
  @IsEmail({}, { message: 'Email must be a valid email' })
  email: string;
  @MinLength(3, { message: 'avatar must be at least 3 characters long' })
  @IsString({ message: 'avatar must be a string' })
  avatar: string;
  @MinLength(3, { message: 'comment must be at least 3 characters long' })
  @IsString({ message: 'comment must be a string' })
  comment: string;
}
