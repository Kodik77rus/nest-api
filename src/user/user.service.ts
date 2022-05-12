import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CryptoService } from '../crypto/crypto.service';

import { UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entities';

@Injectable()
export class UserService {
  constructor(
    private readonly cryptoService: CryptoService,
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
  ) {}

  async find(name): Promise<User> {
    const user = await this.model.findOne({ name });
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    return user;
  }

  async create(user: CreateUserDto): Promise<string> {
    const newUser: User = {
      ...user,
      password: this.cryptoService.hashData(user.password),
      token: this.cryptoService.generateAcсessToken(user),
    };
    return (await new this.model(newUser).save()).token;
  }

  async update(name: string, userData: UpdateUserDto): Promise<User> {
    if (userData.password) {
      userData = {
        ...userData,
        password: this.cryptoService.hashData(userData.password),
      };
    }
    const user = await this.model.findOneAndUpdate({ name }, userData);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    return user;
  }

  async delete(name: string): Promise<string> {
    return (await this.model.findOneAndDelete({ name }))._id;
  }
}
