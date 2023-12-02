import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ResetPasswordDto,
  UpdatePasswordDto,
  VerifyPasswordDto,
} from 'src/users/dto/auth.user.dto';
import { Roles } from 'src/users/guards/roles.decorator';
import { UsersGuard } from 'src/users/guards/users.guard';
import { ResetPasswordService } from 'src/users/services/auth/resetPassword.service';
import { Request } from 'express';

// @Desc cycle Reset Password
// @Route POST [/resetPassword, /verifyCode, /updatePassword]
// @Access ['admin', 'manger', 'user']

@Controller('resetPassword')
@UseGuards(UsersGuard)
export class ResetPasswordController {
  constructor(private readonly ResetPassword: ResetPasswordService) {}

  @Post()
  // @Roles(['admin', 'user', 'manger'])
  ResetPasswordController(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    body: ResetPasswordDto,
  ): Promise<{ status: string; message: string }> {
    return this.ResetPassword.ResetPassword(body);
  }
}

@Controller('verifyCode')
export class VerifyCodeController {
  constructor(private readonly ResetPassword: ResetPasswordService) {}

  @Post()
  VerifyCode(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    body: VerifyPasswordDto,
    @Req() req: Request,
  ) {
    return this.ResetPassword.verifyCode(body.code, req);
  }
}

@Controller('updatePassword')
export class UpdatePasswordController {
  constructor(private readonly ResetPassword: ResetPasswordService) {}

  @Post()
  changePassword(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    body: UpdatePasswordDto,
    @Req()
    req: Request,
  ) {
    return this.ResetPassword.UpdatePassword(body, req);
  }
}
