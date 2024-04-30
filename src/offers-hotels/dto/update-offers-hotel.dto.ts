import { PartialType } from '@nestjs/mapped-types';
import { CreateOffersHotelDto } from './create-offers-hotel.dto';

export class UpdateOffersHotelDto extends PartialType(CreateOffersHotelDto) {}
