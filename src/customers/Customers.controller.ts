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
import { CustomersService } from './Customers.service';
import { CreateCustomerDto } from './dto/CreateCustomerDto.dto';
import { UpdateCustomerDto } from './dto/UpdateCustomerDto.dto';
import { Roles } from 'src/users/guards/roles.decorator';
import { UsersGuard } from 'src/users/guards/users.guard';

@Controller('customers')
@UseGuards(UsersGuard)
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}
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
    createCustomerDto: CreateCustomerDto,
  ) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(id);
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
    updateOffersHotelDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(id, updateOffersHotelDto);
  }

  @Delete(':id')
  @Roles(['admin', 'manger'])
  remove(@Param('id') id: string) {
    return this.customersService.remove(id);
  }
}
