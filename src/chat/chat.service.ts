import { Inject, Injectable } from '@nestjs/common';

import { Users } from 'src/users/interfaces/users.interface';
import { Model } from 'mongoose';

@Injectable()
export class ChatService {
  constructor(
    @Inject('USERS_MODEL')
    private readonly userModule: Model<Users>,
  ) {}
  async insertClientId(userId, clientId) {
    const user = await this.userModule.findOneAndUpdate(
      { _id: userId },
      { chatSocketId: clientId },
      { new: true },
    );

    if ((user?.role || '') === 'admin' || (user?.role || '') === 'manger') {
      await this.userModule.updateMany(
        {},
        { chatSocketAdminId: clientId },
        { new: true },
      );
    }
    return user;
  }
}
