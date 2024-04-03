import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { SubService } from '../services/sub.service';
import { SubEmailDto, SubMsgDto } from '../dto/msgDto.dto';
import { Roles } from 'src/users/guards/roles.decorator';
import { UsersGuard } from 'src/users/guards/users.guard';

@Controller('sub')
@UseGuards(UsersGuard)
export class SubController {
  constructor(private readonly subService: SubService) {}

  @Post()
  subEmail(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    body: SubEmailDto,
  ) {
    return this.subService.subEmail(body);
  }

  @Roles(['admin', 'manger'])
  @Post('/sendMsg')
  subMsg(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    body: SubMsgDto,
  ) {
    return this.subService.subMsg(body);
  }
}
