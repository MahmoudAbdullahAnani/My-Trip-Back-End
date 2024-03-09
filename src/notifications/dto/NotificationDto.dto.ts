import {
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class NotificationDto {
  @IsString({ message: 'The Title Must Be String' })
  @MinLength(2, { message: 'The Title is Very Short' })
  @MaxLength(100, { message: 'The Title is Very Longe' })
  title: string;
  @IsString({ message: 'The Content Must Be String' })
  @MinLength(2, { message: 'The Content is Very Short' })
  content: string;
  @IsOptional()
  exDate: Date;
}
export class UpdateNotificationDto {
  @IsString({ message: 'The Title Must Be String' })
  @MinLength(2, { message: 'The Title is Very Short' })
  @MaxLength(100, { message: 'The Title is Very Longe' })
  @IsOptional()
  title: string;
  @IsString({ message: 'The Content Must Be String' })
  @MinLength(2, { message: 'The Content is Very Short' })
  @IsOptional()
  content: string;
  @IsBoolean({ message: 'The IsSee Must True Or False' })
  @IsOptional()
  isSee: boolean;
  @IsDate({ message: 'The Date Must Be Valid Date' })
  @IsOptional()
  data: Date;
  // @IsDate({ message: 'The ex Date Must Be Valid Date' })
  @IsOptional()
  exDate: Date;
}
