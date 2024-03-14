import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { UsersGuard } from 'src/users/guards/users.guard';
import { Roles } from 'src/users/guards/roles.decorator';

@Controller('hotel')
@UseGuards(UsersGuard)
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Post()
  @Roles(['admin', 'manger', 'user'])
  getHotels(@Body() body: any) {
    return this.hotelService.getHotels(
      body.chooseCityNameHotel,
      body.dateGoState,
      body.dateReturnState,
      body.adultsDataState,
    );
  }
}
