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
import { EmailService } from 'src/users/email.provider';
@Injectable()
export class SignupService {
  constructor(
    @Inject('USERS_MODEL')
    private readonly usersModule: Model<Users>,
    private jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}
  async signup(
    createUserDto: CreateUserSingUpDto,
  ): Promise<{ data: CreateUserSingUpDto; token: string }> {
    const user = await this.usersModule.findOne({
      userName: createUserDto.userName,
    });

    // User exist
    if (user) {
      if (user.active === true) {
        throw new HttpException('The user is already exist, go to login', 400);
      } else {
        throw new HttpException(
          'This account already exists. Go to login',
          400,
        );
      }
    }
    const userEmail = await this.usersModule.findOne({
      email: createUserDto.email,
    });

    // User exist
    if (userEmail) {
      if (userEmail.active === true) {
        throw new HttpException('The user is already exist, go to login', 400);
      } else {
        throw new HttpException(
          'This account already exists. Go to login',
          400,
        );
      }
    }

    // Create code example (854789)
    // Generate a verification code (a simple 6-digit code)
    const verificationAccountCode = Math.floor(100000 + Math.random() * 900000);

    // Create User
    // Hashing Password
    // Save verificationCode in DB
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(createUserDto.password, salt);
    const newUser = await this.usersModule.create({
      ...createUserDto,
      password,
      role: 'user',
      verificationAccountCode,
    });
    // 3) send code on this is email
    // console.log(email.email);

    const messageHTML = `<div><h4>Hello Mr/<b> ${newUser.firstName} ${newUser.lastName}</b></h4> \n <h4>this your code <h1 style="color:red;background:#dadada;width="fit-content";padding="5px 10px";border-radius="8px">${verificationAccountCode}</h1></h4> <h5>The duration of this code is <b>10 minutes.</b></h5>\n With regards, <b>P.Travel</b></div>`;

    await this.emailService.sendMail(
      process.env.USER,
      createUserDto.email,
      'Account Confirmation',

      `<div><h4>Hello Mr/<b> ${newUser.firstName} ${newUser.lastName}</b></h4> \n <h4>this your code <h1 style="color:red;background:#dadada;width="fit-content";padding="5px 10px";border-radius="8px">${verificationAccountCode}</h1></h4> <h5>The duration of this code is <b>2 minutes.</b></h5>\n With regards, <b>Trip</b></div>`,
    );
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

  async verificationAccount(verificationAccountDto): Promise<any> {
    const userEmail = await this.usersModule.findOne({
      email: verificationAccountDto.email,
    });

    if (!userEmail) {
      throw new NotFoundException();
    }
    // console.log({
    //   userEmail: userEmail,
    //   verificationCode: verificationAccountDto.verificationCode,
    // });

    if (
      userEmail.verificationAccountCode !==
      verificationAccountDto.verificationAccountCode
    ) {
      // await this.usersModule.deleteOne({ email: verificationAccountDto.email });
      throw new HttpException('The verification code is not correct', 400);
    }
    const handleUser = await this.usersModule
      .findOneAndUpdate(
        {
          email: verificationAccountDto.email,
          userName: verificationAccountDto.userName,
        },
        { verificationAccountCode: 'done' },
        { new: true },
      )
      .select(
        '_id firstName lastName email userName  phoneNumber createdAt updatedAt active ',
      );
    return handleUser;
  }
}
