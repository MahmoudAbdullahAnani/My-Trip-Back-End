import {
  Injectable,
  NotFoundException,
  HttpException,
  Inject,
  ExceptionFilter,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Model } from 'mongoose';
import { Users } from '../interfaces/users.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_MODEL')
    private readonly userModule: Model<Users>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    // if this is data of user exist==> throw error this is user exist
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(createUserDto.password, salt);

    const userEmail = await this.userModule.findOne({
      // userName: createUserDto.userName,
      email: createUserDto.email,
    });
    const userUserName = await this.userModule.findOne({
      userName: createUserDto.userName,
      // email: createUserDto.email,
    });
    if (userEmail || userUserName) {
      if (userEmail) {
        throw new HttpException('The user is already exist', 400);
      } else {
        throw new HttpException('The user name is already exist', 400);
      }
    }

    // if this is data of user not exist==> Create New User
    const newUser = await this.userModule.create({
      ...createUserDto,
      password,
    });
    // return this.usersRepository.save({ ...newUser, active: true });
    return newUser;
  }

  async findAll(): Promise<{ data: CreateUserDto[]; count:number}> {
    const users = await this.userModule
      .find({})
      .select(
        '_id firstName lastName avatar email userName role phoneNumber createdAt updatedAt active ',
      );
    return {
      data: users,
      count: users.length,
    };
  }

  async findOne(id: string): Promise<CreateUserDto> {
    const user = await this.userModule.findOne({ _id: id });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    try {
      const users = await this.userModule.find({ _id: id });
    } catch (error) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    // console.log('users==>',users);

    // if this is user not exist
    // if (users.length<=0) {
    //   // Code to handle when the user does not exist
    //   throw new NotFoundException(`User with ID "${id}" not found`);
    // }
    const user = await this.userModule.findOne({ _id: id });

    let userUpdate = {};
    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(updateUserDto.password, salt);
      userUpdate = await this.userModule
        .findOneAndUpdate(
          { _id: user._id },
          { ...updateUserDto, password },
          { new: true },
        )
        .select(
          '_id firstName lastName email userName avatar phoneNumber createdAt updatedAt active ',
        );
    } else {
      userUpdate = await this.userModule
        .findOneAndUpdate({ _id: user._id }, updateUserDto, { new: true })
        .select(
          '_id firstName lastName email userName avatar phoneNumber createdAt updatedAt active ',
        );
    }
    return userUpdate;
  }

  async remove(id: string): Promise<void | ExceptionFilter> {
    try {
      const users = await this.userModule.find({ _id: id });
      await this.userModule.deleteOne({ _id: id });
    } catch (error) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
