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
import { Users } from 'src/users/interfaces/users.interface';

interface DataNotificationsType {
  _id: string;
  isSee: boolean;
  title: string;
  content: string;
  date: Date;
}

@Injectable()
export class NotificationsService {
  constructor(
    @Inject('USERS_MODEL')
    private readonly usersModule: Model<Users>,
    private jwtService: JwtService,
  ) {}
  // Get All Notifications on single user
  async getNotifications(
    userId: string,
    req,
  ): Promise<{ Notifications: []; data: {} }> {
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
      const user = await this.usersModule
        .findById(userId)
        .select('notification firstName lastName email');
      const allNotifications = (await user).notification;

      return {
        Notifications: allNotifications,
        data: user,
      };
    } catch (error) {
      throw new NotFoundException(`Not Found User`, {
        cause: new Error(),
        description: `Not Found User on this ID ${userId}`,
      });
    }
  }
  // Get single Notification on single user
  async getSingleNotification(
    userId: string,
    notificationId,
    req,
  ): Promise<{ Notifications: {}; data: {} }> {
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
      const user = await this.usersModule
        .findById(userId)
        .select('notification firstName lastName email');
      const allNotifications = (await user).notification;
      const singleNotification = allNotifications.filter(
        ({ _id }: { _id: string }) => _id.toString() === notificationId,
      );
      // console.log('singleNotification==> ', singleNotification);
      // console.log('user==> ', user);
      // console.log('allNotifications==> ', allNotifications);

      return {
        Notifications: singleNotification[0], // singleNotification
        data: user, //user
      };
    } catch (error) {
      throw new NotFoundException(`Not Found User`, {
        cause: new Error(),
        description: `Not Found User on this ID ${userId}`,
      });
    }
  }

  // Create Notification on single user
  async createNotification(
    userId: string,
    notificationDto,
    req,
  ): Promise<{ NotificationsCreated: []; data: {} }> {
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

    const data = {
      isSee: false,
      title: notificationDto.title,
      content: notificationDto.content,
      date: new Date(),
    };

    const userByNotification = await this.usersModule.findById(userId);
    const notifications = userByNotification.notification;
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
    try {
      const user = await this.usersModule.findByIdAndUpdate(
        userId,
        {
          $addToSet: {
            notification: data,
          },
        },
        { new: true },
      );
      return {
        NotificationsCreated: user.notification,
        data: user,
      };
    } catch (error) {
      throw new NotFoundException(`Not Found User`, {
        cause: new Error(),
        description: `Not Found User on this ID ${userId}`,
      });
    }
  }

  // update Notification on single user
  async updateSingleNotification(
    userId: string,
    notificationId,
    updateNotificationDto,
    req,
  ): Promise<{ NotificationsUpdate: []; data: {} }> {
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

    // const data = {
    //   isSee: updateNotificationDto.isSee,
    //   title: updateNotificationDto.title,
    //   content: updateNotificationDto.content,
    //   date: updateNotificationDto.date,
    // };

    const userByNotification = await this.usersModule.findById(userId);
    const notifications = userByNotification.notification;
    const resultExist: { _id; title: string }[] = notifications.filter(
      ({ _id }: DataNotificationsType) => _id.toString() === notificationId,
    );
    const allNotificationsNotUpdated: { _id }[] = notifications.filter(
      ({ _id }: DataNotificationsType) => _id.toString() !== notificationId,
    );

    // console.log('resultExist==> ', resultExist);
    // console.log('notificationId==> ', notificationId);
    // process.exit(1)
    if (resultExist.length <= 0) {
      throw new NotFoundException(`notification not found`, {
        cause: new Error(),
        description: `notification not found on this ID ${notificationId}`,
      });
    }
    if (resultExist[0].title === updateNotificationDto.title) {
      throw new HttpException(
        `notification already exist`,
        HttpStatus.FORBIDDEN,
        {
          cause: new Error(),
          description: `this is Notification already exist on this is title ${resultExist[0].title}`,
        },
      );
    }
    try {
      const dataUpdated = {
        _id: resultExist[0]._id,
        isSee: false,
        title: updateNotificationDto.title,
        content: updateNotificationDto.content,
        date: new Date(),
      };
      // console.log('allNotificationsNotUpdated==> ', allNotificationsNotUpdated);
      const handleNotifications = [...allNotificationsNotUpdated, dataUpdated];
      // console.log('handleNotifications==> ', handleNotifications);
      const user = await this.usersModule.findByIdAndUpdate(
        userId,
        {
          $set: {
            notification: handleNotifications,
          },
        },
        { new: true },
      );
      // console.log(user.notification);

      return {
        NotificationsUpdate: user.notification,
        data: user,
      };
    } catch (error) {
      console.log(error);

      throw new NotFoundException(`Not Found User`, {
        cause: new Error(),
        description: `Not Found User on this ID ${userId}`,
      });
    }
  }

  // Functions For UsersMe ==>
  // Get All Notifications user Account
  async getUserNotifications(req): Promise<{ Notifications: [] }> {
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
    const payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
    try {
      const user = await this.usersModule.findById(payload._id);
      const allNotifications = (await user).notification;

      return {
        Notifications: allNotifications,
      };
    } catch (error) {
      throw new NotFoundException(`Not Found User`, {
        cause: new Error(),
        description: `Not Found User on this ID ${payload._id}`,
      });
    }
  }

  // update Notification IsSee True
  async updateUserMeNotification(
    notificationId,
    req,
  ): Promise<{ NotificationsUpdate: [] }> {
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
    const payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });

    const userByNotification = await this.usersModule.findById(payload._id);
    const notifications = userByNotification.notification;
    const resultExist: { _id; title: string; content: string }[] =
      notifications.filter(
        ({ _id }: DataNotificationsType) => _id.toString() === notificationId,
      );
    const allNotificationsNotUpdated: { _id }[] = notifications.filter(
      ({ _id }: DataNotificationsType) => _id.toString() !== notificationId,
    );

    // console.log('resultExist==> ', resultExist);
    // console.log('allNotificationsNotUpdated==> ', allNotificationsNotUpdated);
    // console.log('notificationId==> ', notificationId);
    // process.exit(1)
    if (resultExist.length <= 0) {
      throw new NotFoundException(`notification not found`, {
        cause: new Error(),
        description: `notification not found on this ID ${notificationId}`,
      });
    }
        // if (resultExist[0].title === updateNotificationDto.title) {
        //   throw new HttpException(
        //     `notification already exist`,
        //     HttpStatus.FORBIDDEN,
        //     {
        //       cause: new Error(),
        //       description: `this is Notification already exist on this is title ${resultExist[0].title}`,
        //     },
        //   );
        // }
    try {
      const dataUpdated = {
        _id: resultExist[0]._id,
        isSee: true,
        title: resultExist[0].title,
        content: resultExist[0].content,
        date: new Date(),
      };
      // console.log('allNotificationsNotUpdated==> ', allNotificationsNotUpdated);
      const handleNotifications = [...allNotificationsNotUpdated, dataUpdated];
      // console.log('handleNotifications==> ', handleNotifications);
      const user = await this.usersModule.findByIdAndUpdate(
        payload._id,
        {
          $set: {
            notification: handleNotifications,
          },
        },
        { new: true },
      );
      // console.log(user.notification);

      return {
        NotificationsUpdate: user.notification,
      };
    } catch (error) {
      console.log(error);

      throw new NotFoundException(`Not Found User`, {
        cause: new Error(),
        description: `Not Found User on this ID ${payload._id}`,
      });
    }
  }
  // clear Notifications on User Account
  async clearUserMeNotification(req): Promise<{ data: {} }> {
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
    const payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });

    try {
      const user = await this.usersModule
        .findByIdAndUpdate(
          payload._id,
          {
            $set: {
              notification: [],
            },
          },
          { new: true },
        )
        .select(
          '_id firstName lastName email userName password role age phoneNumber createdAt updatedAt active notification',
        );
      return {
        data: user,
      };
    } catch (error) {
      // console.log(error);

      throw new NotFoundException(`Not Found User`, {
        cause: new Error(),
        description: `Not Found User on this ID ${payload._id}`,
      });
    }
  }
}
