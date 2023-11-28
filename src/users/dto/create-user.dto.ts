import {
  IsEnum,
  IsMobilePhone,
  Length,
  MinLength,
  IsEmail,
  IsOptional,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  // firstName Column
  @MinLength(3, { message: 'the first name very short' })
  @MaxLength(30, { message: 'the first name very long' })
  firstName: string;
  // lastName Column
  @IsOptional()
  @MaxLength(30, { message: 'the last name very long' })
  lastName: string;
  // email Column

  @IsEmail({}, { message: 'Invalid Email' })
  email: string;
  // userName Column

  @MinLength(3, { message: 'the user name very short' })
  @MaxLength(30, { message: 'the user name very long' })
  userName: string;
  // password Column

  @MinLength(3, { message: 'the password very short' })
  @MaxLength(20, { message: 'the password very long' })
  password: string;
  // role Column

  @IsEnum(['admin', 'manger', 'user'], {
    message: 'role must be one of the following values: admin, manger, user',
  })
  role: string;
  // Age Column

  @IsOptional()
  age: number;
  // phoneNumber Column

  @IsMobilePhone(
    'ar-EG',
    {},
    { message: 'The phone number must be Egypt and correctly' },
  )
  @Length(11, 11)
  @IsOptional()
  phoneNumber: string;
  // Address Column

  @IsOptional()
  address: string;
  // Active Column
  @IsOptional()
  @IsEnum([true, false])
  active: boolean;
}
export class CreateUserSingUpDto {
  // firstName Column
  @MinLength(3, { message: 'the first name very short' })
  @MaxLength(30, { message: 'the first name very long' })
  firstName: string;
  // lastName Column
  @IsOptional()
  @MaxLength(30, { message: 'the last name very long' })
  lastName: string;
  // email Column

  @IsEmail({}, { message: 'Invalid Email' })
  email: string;
  // userName Column

  @MinLength(3, { message: 'the user name very short' })
  @MaxLength(30, { message: 'the user name very long' })
  userName: string;
  // password Column

  @MinLength(3, { message: 'the password very short' })
  @MaxLength(20, { message: 'the password very long' })
  password: string;
  // role Column
  @IsOptional()
  age: number;
  // phoneNumber Column

  @IsMobilePhone(
    'ar-EG',
    {},
    { message: 'The phone number must be Egypt and correctly' },
  )
  @Length(11, 11)
  @IsOptional()
  phoneNumber: string;
  // Address Column

  @IsOptional()
  address: string;
  // Active Column
  @IsOptional()
  @IsEnum([true, false])
  active: boolean;
}
