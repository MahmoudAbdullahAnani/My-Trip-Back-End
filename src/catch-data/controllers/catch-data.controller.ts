import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
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
  // @Desc This is Request for catch data (openWebsite, search, chooseTicket) on the project
  // @Route Post /catch-data
  // @Access Not Access
  @Post()
  async catchingData(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    catchDataDto: CatchDataDto,
  ) {
    return await this.catchDataService.catchingData(catchDataDto);
  }
  // =========================================================================================================================================
  // @Desc This is Request for update (search) catch data (openWebsite, search, chooseTicket) on the project
  // @Route Patch /catch-data/:id
  // @Access Not Access
  @Patch('/search/:id')
  async updateSearchCatchingData(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    catchDataDto: CatchDataDto,
    @Param('id') id: string,
  ) {
    return await this.catchDataService.updateSearchCatchingData(
      catchDataDto,
      id,
    );
  }
  // =========================================================================================================================================
  // @Desc This is Request for update (ticket) catch data (openWebsite, search, chooseTicket) on the project
  // @Route Patch /catch-data/:id
  // @Access Not Access
  // @Patch('/ticket/:id')
  // async updateTicketCatchingData(
  //   @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  //   catchDataDto: CatchDataDto,
  //   @Param('id') id: string,
  // ) {
  //   return await this.catchDataService.updateTicketCatchingData(catchDataDto, id);
  // }
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
  // @Desc can admin or manger get single data (openWebsite, search, chooseTicket) on the project
  // @Route Get /catch-data/:id
  // @Access ['admin', 'manger']
  @Get(':id')
  @UseGuards(UsersGuard)
  @Roles(['admin', 'manger'])
  async findOne(@Param('id') id: string) {
    return await this.catchDataService.findOne(id);
  }
  // =========================================================================================================================================
}
