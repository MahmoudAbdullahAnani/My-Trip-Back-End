import {
  Controller,
  Get,
  Body,
  Patch,
  Delete,
  UseGuards,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import { UsersMeService } from '../services/usersMe.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersGuard } from '../guards/users.guard';
import { Roles } from '../guards/roles.decorator';


  // @Desc any user can get or update or remove an information data or your account
@Controller('me')
@UseGuards(UsersGuard)
export class UsersMeController {
  constructor(private readonly usersService: UsersMeService) {}

  // @Desc any user can get information data on your account
  // @Route GET /me
  // @Access ['admin', 'manger', 'user']
  @Roles(['admin', 'manger', 'user'])
  @Get()
  findOne(@Req() req: any) {
    return this.usersService.findOne(req);
  }

  // @Desc any user can update information data on your account
  // @Route Patch /me
  // @Access ['admin', 'manger', 'user']
  @Roles(['admin', 'manger', 'user'])
  @Patch()
  update(
    @Req() req: any,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(req, updateUserDto);
  }

  // @Desc any user can remove your account
  // @Route Delete /me
  // @Access ['admin', 'manger', 'user']
  @Roles(['admin', 'manger', 'user'])
  @Delete()
  remove(@Req() req: any) {
    return this.usersService.remove(req);
  }
}
