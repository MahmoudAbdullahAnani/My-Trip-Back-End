import {
  Injectable,
  Req,
  UnauthorizedException,
  NotFoundException,
  HttpException,
  Inject,
} from '@nestjs/common';
import { CreateUserSingUpDto } from '../../dto/create-user.dto';

import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { Users } from 'src/users/interfaces/users.interface';
@Injectable()
export class SignupService {
  constructor(
    @Inject('USERS_MODEL')
    private readonly usersModule: Model<Users>,
    private jwtService: JwtService,
  ) {}
  async signup(
    createUserDto: CreateUserSingUpDto,
  ): Promise<{ data: CreateUserSingUpDto; token: string }> {
    const user = await this.usersModule.findOne({userName:createUserDto.userName})

    // User exist
    if (user) {
      if (user.active === true) {
        throw new HttpException('The user is already exist, go to login', 400);
      } else {
        throw new HttpException(
          'Your account is not activated. Log in again if you want to activate it',
          400,
        );
      }
    }
    // Create User
    // Hashing Password
    // Save verificationCode in DB
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(createUserDto.password, salt);
    const newUser = await this.usersModule.create({
      ...createUserDto,
      password,
      role:"user"
    });

    const payload: { _id: string; userName: string; role: string } = {
      _id: newUser._id,
      userName: newUser.userName,
      role: newUser.role,
    };
    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
    });

    return { token, data: newUser };
  }
}
