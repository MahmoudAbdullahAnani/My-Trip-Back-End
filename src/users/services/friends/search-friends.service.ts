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
export class SearchFriendsService {
  constructor(
    @Inject('USERS_MODEL')
    private readonly users: Model<Users>,
    private readonly jwtService: JwtService,
  ) {}

  async findOne(keyword, req) {
    const token = req.headers.authorization.split(' ', 2)[1];

    if (!token) {
      throw new UnauthorizedException();
    }

    const payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
    const userSender = payload._id; // user sender Friend request

    // const friends = this.users.find(userSender)

    // search on data base by keyword
    const friends = await this.users
      .find({
        $or: [
          { firstName: { $regex: keyword, $options: 'i' } },
          { lastName: { $regex: keyword, $options: 'i' } },
          { email: { $regex: keyword, $options: 'i' } },
          { userName: { $regex: keyword, $options: 'i' } },
        ],
      })
      .select('firstName lastName avatar friends avatar notification email age userName')
      .populate({
        path: 'friends',
        select: 'firstName lastName avatar friends avatar',
      });

    return { data: friends, count: friends.length };
  }
}
