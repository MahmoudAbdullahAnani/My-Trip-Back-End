import {
  IsEnum,
  IsMobilePhone,
  Length,
  MinLength,
  IsEmail,
  IsOptional,
  MaxLength,
  IsString,
  IsNumber,
} from 'class-validator';

export class CreateUserDto {
  // firstName Column
  @MinLength(3, { message: 'the first name very short' })
  @MaxLength(30, { message: 'the first name very long' })
  @IsString({ message: 'first name must be a string' })
  firstName: string;
  // lastName Column
  @IsOptional()
  @MaxLength(30, { message: 'the last name very long' })
  @IsString({ message: 'last name must be a string' })
  lastName: string;
  // email Column

  @IsEmail({}, { message: 'Invalid Email' })
  @IsString({ message: 'email must be a string' })
  email: string;
  // userName Column

  @MinLength(3, { message: 'the user name very short' })
  @MaxLength(30, { message: 'the user name very long' })
  @IsString({ message: 'user name must be a string' })
  userName: string;
  // password Column

  @MinLength(3, { message: 'the password very short' })
  @MaxLength(20, { message: 'the password very long' })
  @IsString({ message: 'password must be a string' })
  password: string;
  // role Column

  @IsEnum(['admin', 'manger', 'user'], {
    message: 'role must be one of the following values: admin, manger, user',
  })
  role: string;
  // Age Column

  @IsOptional()
  @IsNumber({}, { message: 'age must be a number' })
  age: number;
  // phoneNumber Column

  @IsMobilePhone(
    'ar-EG',
    {},
    { message: 'The phone number must be Egypt and correctly' },
  )
  @Length(11, 11)
  @IsOptional()
  @IsString({ message: 'phone number must be a string' })
  phoneNumber: string;
  // Address Column

  @IsOptional()
  @IsString({ message: 'address must be a string' })
  address: string;
  // Active Column
  @IsOptional()
  @IsEnum([true, false])
  active: boolean;

  @IsOptional()
  @IsString({ message: 'avatar must be a string' })
  avatar: string;
}
export class CreateUserSingUpDto {
  // firstName Column
  @MinLength(3, { message: 'the first name very short' })
  @MaxLength(30, { message: 'the first name very long' })
  @IsString({ message: 'first name must be a string' })
  firstName: string;
  // lastName Column
  @IsOptional()
  @MaxLength(30, { message: 'the last name very long' })
  @IsString({ message: 'last name must be a string' })
  lastName: string;
  // email Column

  @IsEmail({}, { message: 'Invalid Email' })
  @IsString({ message: 'email must be a string' })
  email: string;
  // userName Column

  @MinLength(3, { message: 'the user name very short' })
  @MaxLength(30, { message: 'the user name very long' })
  @IsString({ message: 'user name must be a string' })
  userName: string;
  // password Column

  @MinLength(3, { message: 'the password very short' })
  @MaxLength(20, { message: 'the password very long' })
  @IsString({ message: 'password must be a string' })
  password: string;
  // role Column
  @IsOptional()
  @IsNumber({}, { message: 'age must be a number' })
  age: number;
  // phoneNumber Column

  @IsMobilePhone(
    'ar-EG',
    {},
    { message: 'The phone number must be Egypt and correctly' },
  )
  @Length(11, 11)
  @IsOptional()
  @IsString({ message: 'phone number must be a string' })
  phoneNumber: string;
  // Address Column

  @IsOptional()
  @IsString({ message: 'address must be a string' })
  address: string;
  // Active Column
  @IsOptional()
  @IsEnum([true, false])
  active: boolean;

  @IsOptional()
  @IsString({ message: 'avatar must be a string' })
  avatar: string;
}
