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
export class SubEmailDto {
  @IsString({ message: 'name must be a string' })
  @MinLength(3, { message: 'name must be at least 3 characters long' })
  name: string;
  @IsEmail({}, { message: 'email must be a valid email' })
  email: string;
}
export class SubMsgDto {
  @IsString({ message: 'title must be a string' })
  @MinLength(5, { message: 'title must be at least 5 characters long' })
  msgTitle: string;
  @IsString({ message: 'content must be a string' })
  @MinLength(5, { message: 'content must be at least 5 characters long' })
  msgContent: string;
  @IsEmail({}, { message: 'email must be a valid email' })
  email: string;
}
