import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { MsgService } from '../services/msg.service';
import { MsgDto } from '../dto/msgDto.dto';
import { UsersGuard } from 'src/users/guards/users.guard';
import { Roles } from 'src/users/guards/roles.decorator';

@Controller('msg')
@UseGuards(UsersGuard)
export class MsgController {
  constructor(private readonly msgService: MsgService) {}

  @Post()
  sendMsg(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    body: MsgDto,
  ) {
    return this.msgService.sendMsg(body);
  }
  @Get()
  @Roles(['admin', 'manger'])
  getAllMsgs() {
    return this.msgService.getAllMsgs();
  }
}
