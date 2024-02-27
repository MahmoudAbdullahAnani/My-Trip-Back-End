import {
  Injectable,
  Req,
  UnauthorizedException,
  NotFoundException,
  HttpException,
  Inject,
} from '@nestjs/common';
import { CreateUserDto, CreateUserSingUpDto } from '../../dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Login } from 'src/users/dto/auth.user.dto';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { Users } from 'src/users/interfaces/users.interface';

@Injectable()
export class SigninService {
  constructor(
    @Inject('USERS_MODEL')
    private readonly usersModule: Model<Users>,
    private jwtService: JwtService,
  ) {}
  async signin(login: Login): Promise<{ data: CreateUserDto; token: string }> {
    const user = await this.usersModule
      .findOne({ email: login.email })
      .select('_id password role firstName lastName email userName verificationAccountCode age phoneNumber');

    // const user = await this.usersRepository.findOne({
    //   where: {
    //     userName: login.userName,
    //   },
    // });

    // User exist
    if (!user) {
      throw new HttpException('Incorrect Data', 400);
    }
    const verifyPassword = await bcrypt.compare(login.password, user.password);
    if (!verifyPassword) {
      throw new HttpException('Incorrect Data', 400);
    }

    // check if user un active then=> active this is user
    if (!user.active) {
      await this.usersModule.findOneAndUpdate(
        { _id: user._id },
        { active: true },
        { new: true },
      );
    }
    // Create Token login ===> encoded
    const payload: { _id: string; userName: string; role: string } = {
      _id: user._id,
      userName: user.userName,
      role: user.role,
    };
    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
    });

    return { token, data: user };
  }
}
