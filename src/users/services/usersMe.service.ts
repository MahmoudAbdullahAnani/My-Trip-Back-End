import { Injectable, Req, UnauthorizedException, Inject, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { Users } from '../interfaces/users.interface';

@Injectable()
export class UsersMeService {
  constructor(
    @Inject('USERS_MODEL')
    private readonly usersModule: Model<Users>,
    private jwtService: JwtService,
  ) {}
  async findOne(req: any): Promise<CreateUserDto> {
    const token = req.headers?.authorization.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      const user = await this.usersModule
        .findOne({ _id: payload._id })
        .select(
          '_id firstName lastName email userName role age phoneNumber active gender nationality country passportNumber',
        );

      // if notfound user on this _id in the token
      if (!user) {
        throw new NotFoundException()
      }
      return user;
    } catch {
      throw new UnauthorizedException();
    }
  }

  async update(req: any, updateUserDto: UpdateUserDto): Promise<any> {
    const token = req.headers?.authorization.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      const user = await this.usersModule
        .findOne({ _id: payload._id })
        .select(
          ' _id firstName lastName  email userName role age phoneNumber active updatedAt',
        );

      if (updateUserDto.role) {
          throw new UnauthorizedException('Position cannot be modified');
      }

      
      const userUpdate = await this.usersModule.findOneAndUpdate(
        { _id: payload._id },
        updateUserDto,
        { new: true },
      );

      return userUpdate;
    } catch {
      throw new UnauthorizedException();
    }
  }

  async remove(req: any): Promise<void> {
    const token = req.headers.authorization.split(' ', 2)[1];

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      const user = await this.usersModule.findOne({ _id: payload._id });
      const userUpdate = await this.usersModule.findOneAndUpdate(
        { _id: payload._id },
        {active: false },
        { new: true },
      );
    } catch {
      throw new UnauthorizedException();
    }
  }
}
