import {
  Controller,
  Body,
  UseGuards,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { SigninService } from 'src/users/services/auth/sign-in.service';
import { Login } from 'src/users/dto/auth.user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

// @Desc any user can login
// @Route POST /signin
// @Access ['admin', 'manger','user']
@Controller('signin')
// @UseGuards(UsersGuard)
export class SinginController {
  constructor(private readonly signinService: SigninService) {}
  // @Roles(['admin', 'manger', 'user'])
  @Post()
  signin(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    login: Login,
  ): Promise<{ data: CreateUserDto; token: string }> {
    return this.signinService.signin(login);
  }
}
