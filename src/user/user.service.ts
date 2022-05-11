import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
  ) {}

  async updateToken(userId: string): Promise<string> {
    //generate token
    const user = await this.model.findOneAndUpdate<UserDocument>({
      _id: userId,
      token: '',
    });
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    return user.token;
  }

  async find(id: string): Promise<User> {
    const user = await this.model.findOne({ _id: id });
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    return user;
  }

  async create(user: CreateUserDto): Promise<User> {
    return await new this.model(user).save();
  }

  async update(id: string, userData: UpdateUserDto): Promise<User | Error> {
    const user = await this.model.findOneAndUpdate({ _id: id, userData });
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    return user;
  }

  async delete(id: string): Promise<User> {
    return await this.model.findOneAndDelete({ _id: id });
  }
}
