import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CatchDataService } from '../services/catch-data.service';
import { UsersGuard } from 'src/users/guards/users.guard';
import { Roles } from 'src/users/guards/roles.decorator';
import { CatchDataDto } from '../dto/CatchDataDto.dto';

@Controller('catch-data')
export class CatchDataController {
  constructor(private readonly catchDataService: CatchDataService) {}
  // =========================================================================================================================================
  // @Desc can admin or manger get all data (openWebsite, search, chooseTicket) on the project
  // @Route Get /catch-data
  // @Access ['admin', 'manger']
  @Post()
  async catchingData(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    catchDataDto: CatchDataDto,
  ) {
    return await this.catchDataService.catchingData(catchDataDto);
  }
  // =========================================================================================================================================
  // @Desc can admin or manger get all data (openWebsite, search, chooseTicket) on the project
  // @Route Get /catch-data
  // @Access ['admin', 'manger']
  @Get()
  @UseGuards(UsersGuard)
  @Roles(['admin', 'manger'])
  async findAll() {
    return await this.catchDataService.findAll();
  }
  // =========================================================================================================================================
}
