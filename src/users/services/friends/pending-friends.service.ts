import {
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePendingFriendDto } from '../../dto/create-pending-friend.dto';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { Users } from '../../interfaces/users.interface';

// *** this class handle pending friends users ***

@Injectable()
export class PendingFriendsService {
  constructor(
    @Inject('USERS_MODEL')
    private readonly users: Model<Users>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createPendingFriendDto: CreatePendingFriendDto, req: any) {
    const token = req.headers.authorization.split(' ', 2)[1];

    if (!token) {
      throw new UnauthorizedException();
    }

    const payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });

    const userSender = payload._id; // user sender Friend request
    const userReceiver = createPendingFriendDto.userReceiver; // user receiver Friend request

    // If user in friends then Exception
    const userReceiverFriends = await this.users
      .findById(userReceiver)
      .select('friends')
      .populate({
        path: 'pendingFriends',
        select: 'firstName lastName friends',
      });
    const friends = userReceiverFriends.friends;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (friends.includes(userSender as string)) {
      throw new HttpException({}, 401, {
        cause: new Error(),
        description: `You are already friends`,
      });
    }

    try {
      const setPendingFriend = await this.users
        .findByIdAndUpdate(
          userReceiver,
          {
            $addToSet: { pendingFriends: userSender },
          },
          {
            new: true,
          },
        )
        .select('friends pendingFriends');
      return setPendingFriend;
    } catch {
      throw new HttpException({}, 401, {
        cause: new Error(),
        description: `You must log in`,
      });
    }
  }

  async findAll(req) {
    const token = req.headers.authorization.split(' ', 2)[1];

    if (!token) {
      throw new UnauthorizedException();
    }

    const payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });

    const userSender = payload._id; // user sender Friend request
    return this.users
      .findById(userSender)
      .select('pendingFriends avatar')
      .populate({
        path: 'pendingFriends',
        select: 'firstName lastName friends avatar',
      });
  }

  async findOne(id, req) {
    const token = req.headers.authorization.split(' ', 2)[1];

    if (!token) {
      throw new UnauthorizedException();
    }

    const payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
    const userSender = payload._id; // user sender Friend request

    const pendingFriends = this.users
      .findById(userSender)
      .select('pendingFriends friends avatar')
      .populate({
        path: 'pendingFriends',
        select: 'firstName lastName friends avatar',
      });

    const pendingFriend = (await pendingFriends).pendingFriends.filter(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ({ _id }) => _id.toString() === id.toString(),
    );
    if (!pendingFriend[0]) {
      throw new NotFoundException(`Not Found user on this id`);
    }
    return pendingFriend[0];
  }

  async update(id, operation, req) {
    const token = req.headers.authorization.split(' ', 2)[1];

    if (!token) {
      throw new UnauthorizedException();
    }

    const payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
    const userSender = payload._id; // user sender Friend request

    // Remove this user on idUser
    const newData = await this.users
      .findByIdAndUpdate(
        userSender,
        {
          $pull: { pendingFriends: id },
        },
        { new: true },
      )
      .select('firstName lastName avatar friends pendingFriends friends')
      .populate({
        path: 'pendingFriends',
        select: 'firstName lastName avatar email',
      })
      .populate({ path: 'friends', select: 'firstName avatar lastName email' });

    // If User rejected pending friend ===> return message
    if (operation === 'no') {
      return newData;
    }
    // ! سوف اقوم بترك ثغرة هنا متعمدا و هي يمكن اضافة الصديق بدون ان يمر بمرحله التمهيد للصداقة
    // If User accept pending friend ===> add to friend
    const addFriendReceiver = await this.users
      .findByIdAndUpdate(
        userSender,
        {
          $addToSet: { friends: id },
        },
        { new: true },
      )
      .select('firstName lastName avatar friends pendingFriends friends')
      .populate({
        path: 'pendingFriends',
        select: 'firstName lastName avatar email',
      })
      .populate({ path: 'friends', select: 'firstName lastName avatar email' });
    const addFriendSender = await this.users
      .findByIdAndUpdate(
        id,
        {
          $addToSet: { friends: userSender },
        },
        { new: true },
      )
      .select('firstName lastName friends avatar pendingFriends friends')
      .populate({
        path: 'pendingFriends',
        select: 'firstName lastName avatar email',
      })
      .populate({ path: 'friends', select: 'firstName avatar lastName email' });

    return addFriendReceiver;
  }
}
