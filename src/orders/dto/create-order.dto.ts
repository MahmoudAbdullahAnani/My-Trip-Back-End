import { IsNumber, IsString } from 'class-validator';

export class CreateOrderStripeDto {
  @IsNumber({}, { message: 'price Must be number' })
  price: number;
  @IsString({ message: 'description Must be string' })
  description: string;
  @IsString({ message: 'user_id Must be string' })
  user_id?: string;
  @IsString({ message: 'urlSuccess Must be string' })
  urlSuccess: string;
  @IsString({ message: 'urlCancel Must be string' })
  urlCancel: string;
  @IsString({ message: 'userEmail Must be string' })
  userEmail: string;
  @IsString({ message: 'carrierCodeLogo Must be string' })
  carrierCodeLogo: string;
  @IsString({ message: 'timeGo Must be string' })
  timeGo: string;
  @IsString({ message: 'timeSet Must be string' })
  timeSet: string;
  @IsString({ message: 'durationH Must be string' })
  durationM: string;
  @IsString({ message: 'durationM Must be string' })
  durationH: string;
  @IsString({ message: 'typeSystem Must be string' })
  typeSystem: string;
  @IsNumber({}, { message: 'isStope Must be number' })
  isStope: number;
}
export class CreateOrderPayPallDto {
  @IsNumber({}, { message: 'price Must be number' })
  price: number;
  @IsString({ message: 'description Must be string' })
  description: string;
  @IsString({ message: 'user_id Must be string' })
  user_id?: string;
  @IsString({ message: 'urlSuccess Must be string' })
  urlSuccess: string;
  @IsString({ message: 'urlCancel Must be string' })
  urlCancel: string;
  @IsString({ message: 'userEmail Must be string' })
  userEmail: string;
  @IsString({ message: 'carrierCodeLogo Must be string' })
  carrierCodeLogo: string;
  @IsString({ message: 'timeGo Must be string' })
  timeGo: string;
  @IsString({ message: 'timeSet Must be string' })
  timeSet: string;
  @IsString({ message: 'durationH Must be string' })
  durationM: string;
  @IsString({ message: 'durationM Must be string' })
  durationH: string;
  @IsNumber({}, { message: 'isStope Must be number' })
  isStope: number;
}
