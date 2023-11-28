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
  HttpCode,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersGuard } from '../guards/users.guard';
import { Roles } from '../guards/roles.decorator';

// @Desc admin or manger can control users
// @Access ['admin', 'manger']

@Controller('users')
@UseGuards(UsersGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // =========================================================================================================================================
  // @Desc can admin or manger create user or admin or manger account
  // @Route POST /users
  // @Access ['admin', 'manger']
  @Roles(['admin', 'manger'])
  @Post()
  create(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    createUserDto: CreateUserDto,
  ) {
    return this.usersService.create(createUserDto);
  }
  // =========================================================================================================================================
  // @Desc can admin or manger get all accounts users
  // @Route GET /users
  // @Access ['admin', 'manger']
  @Roles(['admin', 'manger'])
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  // =========================================================================================================================================
  // @Desc can admin or manger get specific user
  // @Route GET /users/:id
  // @Access ['admin', 'manger']
  @Roles(['admin', 'manger'])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
  // =========================================================================================================================================
  // @Desc can admin or manger update specific user
  // @Route Patch /users/:id
  // @Access ['admin', 'manger']
  @Roles(['admin', 'manger'])
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }
  // =========================================================================================================================================
  // @Desc can admin or manger delete specific user
  // @Route Delete /users/:id
  // @Access ['admin']
  @Roles(['admin'])
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    this.usersService.remove(id);
  }
}
