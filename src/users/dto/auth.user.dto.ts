import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class Login {
  @IsEmail({}, { message: 'Invalid email' })
  @IsString({ message: 'email must be a string' })
  email: string;
  @MinLength(3, { message: 'the password very short' })
  @MaxLength(20, { message: 'the password very long' })
  @IsString({ message: 'password must be a string' })
  password: string;
}
export class ResetPasswordDto {
  @IsEmail({}, { message: 'Invalid email' })
  @IsString({ message: 'email must be a string' })
  email: string;
}
export class VerifyPasswordDto {
  @IsString({ message: 'Incorrect code' })
  code: string | Buffer;
  @IsEmail({}, { message: 'Invalid email' })
  email: string | Buffer;
}
export class UpdatePasswordDto {
  @MinLength(3, { message: 'the password very short' })
  @MaxLength(20, { message: 'the password very long' })
  @IsString({ message: 'password must be a string' })
  password: string;
  @MinLength(3, { message: 'the password very short' })
  @MaxLength(20, { message: 'the password very long' })
  confirmPassword: string;
  @IsEmail({}, { message: 'Invalid email' })
  @IsString({ message: 'email must be a string' })
  email: string | Buffer;
}
