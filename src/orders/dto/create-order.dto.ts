import { IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNumber({}, { message: 'Must be number' })
  price: number;
  @IsString({ message: 'Must be string' })
  description: string;
  @IsString({ message: 'Must be string' })
  user_id?: string;
  @IsString({ message: 'Must be string' })
  urlSuccess: string;
  @IsString({ message: 'Must be string' })
  urlCancel: string;
  @IsString({ message: 'Must be string' })
  userEmail: string;
  @IsString({ message: 'Must be string' })
  carrierCodeLogo: string;
}

