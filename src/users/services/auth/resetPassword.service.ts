import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ResetPasswordDto,
  UpdatePasswordDto,
} from 'src/users/dto/auth.user.dto';
import { EmailService } from 'src/users/email.service';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Model } from 'mongoose';
import { Users } from 'src/users/interfaces/users.interface';

@Injectable()
export class ResetPasswordService {
  constructor(
    @Inject('USERS_MODEL') private readonly userModel: Model<Users>,
    private jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  async ResetPassword(
    body: ResetPasswordDto,
  ): Promise<{ status: string; message: string }> {
    // 1) get account in this is email, if not exist user on this is email throw error
    const user = await this.userModel.findOne({ email: body.email });

    if (!user) {
      throw new NotFoundException('Not Found User Email', {
        cause: new Error(),
        description: 'not found any user on this email',
      });
    }
    // 2) Create code example (854789)
    // Generate a verification code (a simple 6-digit code)
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    // 3) send code on this is email
    // console.log(email.email);

    try {
      await this.emailService.sendMail(
        process.env.USER,
        body.email,
        'Reset Password Verify Code',
        `This is Your Code ${verificationCode}`,
      );
      // Save verificationCode in DB
      const salt = await bcrypt.genSalt(10);
      const bcryptVerificationCode = await bcrypt.hash(
        `${verificationCode}`,
        salt,
      );
      // save to db
      await this.userModel.findByIdAndUpdate(
        { _id: user._id },
        { verificationCode: bcryptVerificationCode },
        { new: true },
      );
      // await this.userModel.save({
      //   ...user,
      //   verificationCode: bcryptVerificationCode,
      // });
    } catch (error) {
      console.error('Error sending email:', error);

      throw new HttpException('Failed to send email', 500);
    }

    return {
      status: 'success',
      message: `The password reset code has been sent to ${body.email}`,
    };
  }

  async verifyCode(
    code: string | Buffer,
    req: Request,
  ): Promise<{ status: string; message: string }> {
    // 1) get account in this is email, if not exist user on this is email throw error
    const token = req.headers.authorization.split(' ', 2)[1];

    if (!token) {
      throw new UnauthorizedException();
    }
    let id;
    try {
      id = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      })._id;
    } catch (error) {
      throw new UnauthorizedException();
    }

    const user = await this.userModel
      .findOne({ _id: id })
      .select('verificationCode ');
    if (!user) {
      throw new NotFoundException();
    }
    // verify code, if matching update password else res error field code verify

    const isPassword = await bcrypt.compare(
      code.toString(),
      user.verificationCode.toString(),
    );

    if (!isPassword) {
      throw new HttpException('Incorrect code', 500);
    }

    return {
      status: 'success',
      message: `Update Password Now`,
    };
  }

  async UpdatePassword(body: UpdatePasswordDto, req: Request): Promise<Users> {
    // 1) get account in this is email, if not exist user on this is email throw error

    const token = req.headers.authorization.split(' ', 2)[1];

    if (!token) {
      throw new UnauthorizedException();
    }
    let id;
    try {
      id = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      })._id;
    } catch (error) {
      throw new UnauthorizedException();
    }

    const user = await this.userModel.findById(id).select('_id');

    // const user = await this.usersRepository.findOne({
    //   where: {
    //     id,
    //   },
    // });

    if (!user) {
      throw new NotFoundException();
    }
    // verify code, if matching update password else res error field code verify
    const password = body.password;
    const confirmPassword = body.confirmPassword;
    if (password !== confirmPassword) {
      throw new HttpException('Passwords do not match', 500);
    }
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);
    const newData = await this.userModel.findByIdAndUpdate(
      { _id: user._id },
      { password: bcryptPassword, verificationCode: '' },
      { new: true },
    );
    // const newData = await this.usersRepository.save({
    //   ...user,
    //   password: bcryptPassword,
    //   verificationCode: '',
    // });
    return newData;
  }
}
