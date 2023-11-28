import {
  Controller,
  Body,
  Post,
  ValidationPipe,
} from '@nestjs/common';

import { SignupService } from 'src/users/services/auth/sign-up.service';
import { CreateUserSingUpDto } from 'src/users/dto/create-user.dto';

// @Desc any user can registration or create account
// @Route POST /signup
// @Access ['user']
@Controller('signup')
// @UseGuards(UsersGuard)
export class SingupController {
  constructor(private readonly signupService: SignupService) {}
  @Post()
  // @Roles(['admin', 'manger', 'user'])
  signup(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    createUserDto: CreateUserSingUpDto,
  ): Promise<{ data: CreateUserSingUpDto; token: string }> {
    return this.signupService.signup(createUserDto);
  }
}
