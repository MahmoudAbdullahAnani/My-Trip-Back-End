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
export class FriendsService {
  constructor(
    @Inject('USERS_MODEL')
    private readonly users: Model<Users>,
    private readonly jwtService: JwtService,
  ) {}

  async findAll(req) {
    const token = req.headers?.authorization.split(' ', 2)[1];

    if (!token) {
      throw new UnauthorizedException();
    }

    const payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });

    const userSender = payload._id; // user sender Friend request
    return this.users
      .findById(userSender)
      .select('friends firstName lastName')
      .populate({
        path: 'friends',
        select: 'firstName lastName friends',
      })
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

    const friends = this.users
      .findById(userSender)
      .select('friends')
      .populate({
        path: 'friends',
        select: 'firstName lastName friends',
      })
    const friendsSingle = (await friends).friends.filter(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ({ _id }) => _id.toString() === id.toString(),
    );
    if (!friendsSingle[0]) {
      throw new NotFoundException(`Not Found user on this id`);
    }
    return friendsSingle[0];
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

    // If User rejected pending friend ===> return message
    if (operation === 'delete') {
      return await this.users
        .findByIdAndUpdate(
          userSender,
          {
            $pull: { friends: id },
          },
          { new: true },
        )
        .select('firstName lastName friends pendingFriends')
        .populate({
          path: 'pendingFriends',
          select: 'firstName lastName email',
        })
        .populate({ path: 'friends', select: 'firstName lastName email' });
    }

    // If User accept pending friend ===> add to friend
    const addFriend = await this.users
      .findById(userSender)
      .select('firstName lastName friends pendingFriends')
      .populate({ path: 'pendingFriends', select: 'firstName lastName email' })
      .populate({ path: 'friends', select: 'firstName lastName email' });

    return addFriend;
  }
}
