import {
  Injectable,
  NotFoundException,
  HttpException,
  Inject,
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
    // console.log(password);

    const user = await this.userModule.findOne({
      userName: createUserDto.userName,
      email: createUserDto.email,
    });
    if (user) {
      throw new HttpException(
        'The user is already exist, go to update field active true',
        400,
      );
    }

    // if this is data of user not exist==> Create New User
    const newUser = await this.userModule.create({
      ...createUserDto,
      password,
    });
    // return this.usersRepository.save({ ...newUser, active: true });
    return newUser;
  }

  async findAll(): Promise<CreateUserDto[]> {
    return await this.userModule.find({});
  }

  async findOne(id: string): Promise<CreateUserDto> {
    const user = await this.userModule.findOne({ _id: id });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    const user = await this.userModule.findOne({ _id: id });
    let userUpdate = {};
    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(updateUserDto.password, salt);
      userUpdate = await this.userModule.findOneAndUpdate(
        { _id: user._id },
        { ...updateUserDto, password },
        { new: true },
      );
    } else {
      userUpdate = await this.userModule.findOneAndUpdate(
        { _id: user._id },
        updateUserDto,
        { new: true },
      );
    }
    return userUpdate;
  }

  async remove(id: string): Promise<void> {
    await this.userModule.deleteOne({ _id: id });
  }
}
