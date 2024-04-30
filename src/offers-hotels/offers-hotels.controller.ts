import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { OffersHotelsService } from './offers-hotels.service';
import { CreateOffersHotelDto } from './dto/create-offers-hotel.dto';
import { UpdateOffersHotelDto } from './dto/update-offers-hotel.dto';
import { Roles } from 'src/users/guards/roles.decorator';
import { UsersGuard } from 'src/users/guards/users.guard';

@Controller('offers-hotels')
@UseGuards(UsersGuard)
export class OffersHotelsController {
  constructor(private readonly offersHotelsService: OffersHotelsService) {}
  // @Desc admin or manger can control offers
  // @Route POST /offers-hotels
  // @Access ['Admin', 'Manger']
  @Post()
  @Roles(['admin', 'manger'])
  create(
    @Body(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    createOffersHotelDto: CreateOffersHotelDto,
  ) {
    return this.offersHotelsService.create(createOffersHotelDto);
  }

  @Get()
  findAll() {
    return this.offersHotelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.offersHotelsService.findOne(id);
  }

  @Patch(':id')
  @Roles(['admin', 'manger'])
  update(
    @Param('id') id: string,
    @Body(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    updateOffersHotelDto: UpdateOffersHotelDto,
  ) {
    return this.offersHotelsService.update(id, updateOffersHotelDto);
  }

  @Delete(':id')
  @Roles(['admin', 'manger'])
  remove(@Param('id') id: string) {
    return this.offersHotelsService.remove(id);
  }
}
