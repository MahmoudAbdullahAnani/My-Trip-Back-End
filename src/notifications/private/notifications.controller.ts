import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Roles } from 'src/users/guards/roles.decorator';
import {
  NotificationDto,
  UpdateNotificationDto,
} from '../dto/NotificationDto.dto';
import { UsersGuard } from 'src/users/guards/users.guard';

@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}
  // For Admin, Manger =========================================================================================================================================
  // @Desc can admin or manger Get All Notifications on Single User
  // @Route Get /notifications/:userId
  // @Access ['admin', 'manger']
  @Get(':userId')
  @Roles(['admin', 'manger'])
  @UseGuards(UsersGuard)
  getNotifications(@Param('userId') userId, @Req() req: any) {
    return this.notificationsService.getNotifications(userId, req);
  }
  // For Admin, Manger =========================================================================================================================================
  // @Desc can admin or manger Get Single Notification on Single User
  // @Route Get /notifications/:userId/:notificationId
  // @Access ['admin', 'manger']
  @Get(':userId/:notificationId')
  @Roles(['admin', 'manger'])
  @UseGuards(UsersGuard)
  getSingleNotification(
    @Param('userId') userId,
    @Param('notificationId') notificationId,
    @Req() req: any,
  ) {
    return this.notificationsService.getSingleNotification(
      userId,
      notificationId,
      req,
    );
  }
  // For Admin, Manger =========================================================================================================================================
  // @Desc can admin or manger update Single Notification on Single User
  // @Route Patch /notifications/:userId/:notificationId
  // @Access ['admin', 'manger']
  @Patch(':userId/:notificationId')
  @Roles(['admin', 'manger'])
  @UseGuards(UsersGuard)
  updateSingleNotification(
    @Param('userId') userId,
    @Param('notificationId') notificationId,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    updateNotificationDto: UpdateNotificationDto,
    @Req()
    req: any,
  ) {
    return this.notificationsService.updateSingleNotification(
      userId,
      notificationId,
      updateNotificationDto,
      req,
    );
  }

  // For Admin, Manger =========================================================================================================================================
  // @Desc can admin or manger Create Notification on Single User
  // @Route Post /notifications/:userId
  // @Access ['admin', 'manger']
  @Post(':userId')
  @Roles(['admin', 'manger'])
  @UseGuards(UsersGuard)
  createSingleNotification(
    @Param('userId') userId,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    notificationDto: NotificationDto,
    @Req() req: any,
  ) {
    return this.notificationsService.createNotification(
      userId,
      notificationDto,
      req,
    );
  }
}

@Controller('notificationsUserMe')
export class NotificationsUserMeController {
  constructor(private notificationsService: NotificationsService) {}
  // For UsersMe =========================================================================================================================================
  // @Desc get Auto All Notification on User Account
  // @Route Post /notificationsUserMe
  // @Access ['admin', 'manger', 'user']
  @Get()
  @Roles(['admin', 'manger', 'user'])
  @UseGuards(UsersGuard)
  getUserNotifications(@Req() req: any) {
    return this.notificationsService.getUserNotifications(req);
  }
  // For UsersMe =========================================================================================================================================
  // @Desc upDate Auto Notifications see on User Account
  // @Route Patch /notificationsUserMe
  // @Access ['admin', 'manger', 'user']
  @Patch(':notificationId')
  @Roles(['admin', 'manger', 'user'])
  @UseGuards(UsersGuard)
  updateUserNotifications(
    @Param('notificationId') notificationId,
    @Req() req: any,
  ) {
    return this.notificationsService.updateUserMeNotification(
      notificationId,
      req,
    );
  }
  // For UsersMe =========================================================================================================================================
  // @Desc Clear All Notifications on User Account
  // @Route Patch /notificationsUserMe
  // @Access ['admin', 'manger', 'user']
  @Delete()
  @Roles(['admin', 'manger', 'user'])
  @UseGuards(UsersGuard)
  clearUserNotifications(@Req() req: any) {
    return this.notificationsService.clearUserMeNotification(req);
  }
}
