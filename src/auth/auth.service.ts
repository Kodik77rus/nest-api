import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserService } from '../user/user.service';
import { CryptoService } from 'src/crypto/crypto.service';

import { User as UseModel, UserDocument } from '../user/schemas/user.schema';
import { CreateUserDto as UserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entities';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UseModel.name) private userModell: Model<UserDocument>,
    private readonly userService: UserService,
    private readonly cryptoService: CryptoService,
  ) {}

  async registrate(user: UserDto): Promise<string> {
    const isExistUser = await this.getUserFromDb(user.name);
    if (isExistUser) {
      throw new HttpException('users already exist', HttpStatus.BAD_REQUEST);
    }
    return await this.userService.create(user);
  }

  async logIn(user: UserDto): Promise<string> {
    const isValidUser = await this.userService.find(user.name);
    if (!isValidUser) {
      throw new NotFoundException('user not found');
    }

    const isValidPassword = this.cryptoService.isValidHash(
      user.password,
      isValidUser.password,
    );

    if (!isValidPassword) {
      throw new HttpException('wrong password', HttpStatus.BAD_REQUEST);
    }

    const updateData: User = {
      token: this.cryptoService.generateAcсessToken(user),
    };

    return (await this.userService.update(isValidUser.name, updateData)).token;
  }

  async getUserFromDb(name: string) {
    return await this.userModell.findOne({ name });
  }
}
