import { Controller, Body, Post, ValidationPipe, Patch } from '@nestjs/common';

import { SignupService } from 'src/users/services/auth/sign-up.service';
import {
  CreateUserSingUpDto,
  VerificationAccountDto,
} from 'src/users/dto/create-user.dto';

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
  @Patch()
  verificationAccount(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    verificationAccountDto: VerificationAccountDto,
  ): Promise<{ data: CreateUserSingUpDto; token: string }> {
    return this.signupService.verificationAccount(verificationAccountDto);
  }
}
