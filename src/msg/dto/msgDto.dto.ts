import { IsEmail, IsString, MinLength } from 'class-validator';

export class MsgDto {
  @IsString({ message: 'name must be a string' })
  @MinLength(3, { message: 'name must be at least 3 characters long' })
  name: string;
  @IsEmail({}, { message: 'email must be a valid email' })
  email: string;
  @IsString({ message: 'message must be a string' })
  @MinLength(5, { message: 'message must be at least 5 characters long' })
  msg: string;
}
