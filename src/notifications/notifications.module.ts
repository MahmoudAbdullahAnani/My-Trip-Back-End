import { Module } from '@nestjs/common';
import {
  NotificationsController,
  NotificationsUserMeController,
} from './private/notifications.controller';
// service
import { NotificationsService } from './private/notifications.service';
import { PublicNotificationsService } from './public/publicNotifications.service';
// Data Base
import { DatabaseModule } from 'src/database/database.module';
import { userConnectionProvider } from 'src/users/providers/databaseConnection.provider';
import { notificationsConnectionProvider } from './providers/databaseConnection.provider';
// JWT
import { JwtModule } from '@nestjs/jwt';
import { PublicNotificationsController } from './public/notifications.controller';

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
    NotificationsController,
    NotificationsUserMeController,
    PublicNotificationsController,
  ],
  providers: [
    ...userConnectionProvider,
    ...notificationsConnectionProvider,
    NotificationsService,
    PublicNotificationsService,
  ],
})
export class NotificationsModule {}
