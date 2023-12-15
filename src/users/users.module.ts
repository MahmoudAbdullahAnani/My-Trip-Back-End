import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
// JWT
import { JwtModule } from '@nestjs/jwt';
import { UsersMeController } from './controllers/userMe.controller';
import { UsersMeService } from './services/usersMe.service';
import { SingupController } from './controllers/auth/sign-up.controller';
import { SignupService } from './services/auth/sign-up.service';
import { SinginController } from './controllers/auth/sign-in.controller';
import { SigninService } from './services/auth/sign-in.service';
import { EmailService } from './email.provider';
import {
  ResetPasswordController,
  UpdatePasswordController,
  VerifyCodeController,
} from './controllers/auth/resetPassword.controller';
import { ResetPasswordService } from './services/auth/resetPassword.service';
import { userConnectionProvider } from './providers/databaseConnection.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '259200s' },
    }),
  ],
  controllers: [
    UsersController,
    UsersMeController,
    SingupController,
    SinginController,
    ResetPasswordController,
    VerifyCodeController,
    UpdatePasswordController,
  ],
  providers: [
    ...userConnectionProvider,
    UsersService,
    UsersMeService,
    SignupService,
    SigninService,
    ResetPasswordService,
    EmailService,
  ],
})
export class UsersModule {}
