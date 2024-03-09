import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { Notifications } from '../interfaces/notifications.interface';

interface DataNotificationsType {
  _id: string;
  title: string;
  content: string;
  exDate: Date;
}

@Injectable()
export class PublicNotificationsService {
  constructor(
    @Inject('Notifications_MODEL')
    private readonly publicNotifications: Model<Notifications>,
    private jwtService: JwtService,
  ) {}
  // Get All Notifications
  async getPublicNotifications(req): Promise<{}> {
    if (!req.headers.authorization) {
      throw new UnauthorizedException(`Unauthorized`, {
        cause: new Error(),
        description: `You must log in`,
      });
    }
    const token = req.headers?.authorization.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException();
    }

    const AllNotifications = await this.publicNotifications.find({});
    // console.log(AllNotifications);

    return {
      AllNotifications: AllNotifications,
    };
  }
  // Get single Notification
  async getSinglePublicNotification(
    notificationId,
    req,
  ): Promise<{ notification: {} }> {
    if (!req.headers.authorization) {
      throw new UnauthorizedException(`Unauthorized`, {
        cause: new Error(),
        description: `You must log in`,
      });
    }
    const token = req.headers?.authorization.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const notification = await this.publicNotifications
        .findById(notificationId)
        .select('_id title content date');
      if (!notification) {
        throw new NotFoundException(`Not Found Notification`, {
          cause: new Error(),
          description: `Not Found Notification on this ID ${notificationId}`,
        });
      }
      return {
        notification,
      };
    } catch (error) {
      throw new NotFoundException(`Not Found Notification`, {
        cause: new Error(),
        description: `Not Found Notification on this ID ${notificationId}`,
      });
    }
  }

  // Create Notification
  async createPublicNotification(
    notificationDto,
    req,
  ): Promise<{ newNotification: {} }> {
    if (!req.headers.authorization) {
      throw new UnauthorizedException(`Unauthorized`, {
        cause: new Error(),
        description: `You must log in`,
      });
    }
    const token = req.headers?.authorization.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException();
    }

    // const currentDate = new Date();
    // const exDate = new Date(currentDate.getTime() + 259200000); // Ex after 3 day

    const data = {
      isSee: false,
      title: notificationDto.title,
      content: notificationDto.content,
      exDate: notificationDto.exDate,
    };

    const notifications = await this.publicNotifications.find({});
    const resultExist = notifications.filter(
      ({ title, content }: DataNotificationsType) =>
        data.title === title && content === data.content,
    );

    // console.log('resultExist==> ', resultExist);

    if (resultExist.length >= 1) {
      throw new HttpException(
        `notification already exist`,
        HttpStatus.FORBIDDEN,
        {
          cause: new Error(),
          description: `this is Notification already exist`,
        },
      );
    }
    const newNotification = await this.publicNotifications.create(data);
    return {
      newNotification,
    };
  }

  // update Notification
  async updatePublicNotification(
    notificationId,
    updateNotificationDto,
    req,
  ): Promise<{ NotificationsUpdate: {} }> {
    if (!req.headers.authorization) {
      throw new UnauthorizedException(`Unauthorized`, {
        cause: new Error(),
        description: `You must log in`,
      });
    }
    const token = req.headers?.authorization.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException();
    }

    const notification =
      await this.publicNotifications.findById(notificationId);

    // console.log('resultExist==> ', resultExist);
    // console.log('notificationId==> ', notificationId);
    // process.exit(1)
    if (!notification) {
      throw new NotFoundException(`notification not found`, {
        cause: new Error(),
        description: `notification not found on this ID ${notificationId}`,
      });
    }
    const allNotifications = await this.publicNotifications.find({});
    const resultAllNotifications = allNotifications.filter(
      ({ title }: DataNotificationsType) =>
        title === updateNotificationDto.title,
    );
    if (resultAllNotifications.length >= 1) {
      throw new HttpException(
        `notification already exist`,
        HttpStatus.FORBIDDEN,
        {
          cause: new Error(),
          description: `this is Notification already exist on this is title ${resultAllNotifications[0].title}`,
        },
      );
    }
    const NotificationsUpdate =
      await this.publicNotifications.findByIdAndUpdate(
        notificationId,
        updateNotificationDto,
        {
          new: true,
        },
      );
    // console.log(user.notification);

    return {
      NotificationsUpdate,
    };
  }
  // delete public Notification
  async deletePublicNotification(notificationId, req): Promise<void> {
    if (!req.headers.authorization) {
      throw new UnauthorizedException(`Unauthorized`, {
        cause: new Error(),
        description: `You must log in`,
      });
    }
    const token = req.headers?.authorization.split(' ')[1];

    // console.log('token==> ', token);
    if (!token) {
      console.log('test');

      throw new UnauthorizedException();
    }

    const notification =
      await this.publicNotifications.findById(notificationId);
    if (!notification) {
      throw new NotFoundException(`Not Found notification`, {
        cause: new Error(),
        description: `Not Found notification on this ID ${notificationId}`,
      });
    }
    try {
      await this.publicNotifications.findByIdAndDelete(notificationId);
    } catch (error) {
      throw new NotFoundException(`Not Found notification`, {
        cause: new Error(),
        description: `Not Found notification on this ID ${notificationId}`,
      });
    }
  }

  // clear Notifications on User Account
  async clearPublicNotification(req): Promise<void> {
    if (!req.headers.authorization) {
      throw new UnauthorizedException(`Unauthorized`, {
        cause: new Error(),
        description: `You must log in`,
      });
    }
    const token = req.headers?.authorization.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException();
    }

    await this.publicNotifications.deleteMany({});
  }
}
