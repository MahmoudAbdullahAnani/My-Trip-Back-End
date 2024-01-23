import { Module } from '@nestjs/common';
import {
  NotificationsController,
  NotificationsUserMeController,
} from './private/notifications.controller';
import { NotificationsService } from './private/notifications.service';
// Data Base
import { DatabaseModule } from 'src/database/database.module';
import { userConnectionProvider } from 'src/users/providers/databaseConnection.provider';
// JWT
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '259200s' },
    }),
  ],
  controllers: [NotificationsController, NotificationsUserMeController],
  providers: [...userConnectionProvider, NotificationsService],
})
export class NotificationsModule {}
