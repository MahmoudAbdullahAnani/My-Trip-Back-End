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
import { PublicNotificationsService } from './publicNotifications.service';
import { Roles } from 'src/users/guards/roles.decorator';
import {
  NotificationDto,
  UpdateNotificationDto,
} from '../dto/NotificationDto.dto';
import { UsersGuard } from 'src/users/guards/users.guard';

@Controller('public/notifications')
export class PublicNotificationsController {
  constructor(private publicNotificationsService: PublicNotificationsService) {}
  // For Admin, Manger =========================================================================================================================================
  // @Desc can admin or manger or user Get All public Notifications
  // @Route Get /public/notifications
  // @Access ['admin', 'manger']
  @Get()
  // @Roles(['admin', 'manger', 'user'])
  // @UseGuards(UsersGuard)
  getPublicNotifications(@Req() req: any) {
    return this.publicNotificationsService.getPublicNotifications(req);
  }

  // For Admin, Manger =========================================================================================================================================
  // @Desc can admin or manger or user Get Single public Notification
  // @Route Get /public/notifications/:notificationId
  // @Access ['admin', 'manger', 'user']
  @Get(':notificationId')
  // @Roles(['admin', 'manger', 'user'])
  // @UseGuards(UsersGuard)
  getSinglePublicNotification(
    @Param('notificationId') notificationId,
    @Req() req: any,
  ) {
    return this.publicNotificationsService.getSinglePublicNotification(
      notificationId,
      req,
    );
  }
  // For Admin, Manger =========================================================================================================================================
  // @Desc can admin or manger update public Notification
  // @Route Patch /public/notifications/:notificationId
  // @Access ['admin', 'manger']
  @Patch(':notificationId')
  @Roles(['admin', 'manger'])
  @UseGuards(UsersGuard)
  updatePublicNotification(
    @Param('notificationId') notificationId,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    updateNotificationDto: UpdateNotificationDto,
    @Req()
    req: any,
  ) {
    return this.publicNotificationsService.updatePublicNotification(
      notificationId,
      updateNotificationDto,
      req,
    );
  }

  // For Admin, Manger =========================================================================================================================================
  // @Desc can admin or manger Create public Notification
  // @Route Post /public/notifications
  // @Access ['admin', 'manger']
  @Post()
  @Roles(['admin', 'manger'])
  @UseGuards(UsersGuard)
  createPublicNotification(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    notificationDto: NotificationDto,
    @Req() req: any,
  ) {
    return this.publicNotificationsService.createPublicNotification(
      notificationDto,
      req,
    );
  }

  // For Admin, Manger =========================================================================================================================================
  // @Desc can admin or manger delete public Notification
  // @Route Delete /public/notifications/:notificationId
  // @Access ['admin', 'manger']
  @Delete(':notificationId')
  @Roles(['admin', 'manger'])
  @UseGuards(UsersGuard)
  deletePublicNotification(
    @Param('notificationId') notificationId,
    @Req()
    req: any,
  ) {
    return this.publicNotificationsService.deletePublicNotification(
      notificationId,
      req,
    );
  }
  // For Admin, Manger =========================================================================================================================================
  // @Desc can admin or manger clear public Notification
  // @Route Delete /public/notifications
  // @Access ['admin', 'manger']
  @Delete()
  @Roles(['admin', 'manger'])
  @UseGuards(UsersGuard)
  clearPublicNotification(
    @Req()
    req: any,
  ) {
    return this.publicNotificationsService.clearPublicNotification(
      req,
    );
  }
}
