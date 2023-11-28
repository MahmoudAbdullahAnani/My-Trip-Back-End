import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class Login {
  @MinLength(3, { message: 'the user name very short' })
  @MaxLength(30, { message: 'the user name very long' })
  userName: string;
  @MinLength(3, { message: 'the password very short' })
  @MaxLength(20, { message: 'the password very long' })
  password: string;
}
export class ResetPasswordDto {
  @IsEmail({}, { message: 'Invalid email' })
  email: string;
}
export class VerifyPasswordDto {
  @IsString({ message: 'Incorrect code' })
  code: string | Buffer;
}
export class UpdatePasswordDto {
  @MinLength(3, { message: 'the password very short' })
  @MaxLength(20, { message: 'the password very long' })
  password: string;
  @MinLength(3, { message: 'the password very short' })
  @MaxLength(20, { message: 'the password very long' })
  confirmPassword: string;
} 
