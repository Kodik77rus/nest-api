import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { CreateUserDto as UserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entities';

@Injectable()
export class CryptoService {
  constructor(private readonly jwtservice: JwtService) {}

  private salt = bcrypt.genSaltSync(7);

  generateAcсessToken(data: UserDto | User) {
    const payload = { name: data.name };
    return this.jwtservice.sign(payload);
  }

  verifyToken(token: string) {
    return this.jwtservice.verify(token);
  }

  hashData(data: string) {
    return bcrypt.hashSync(data, this.salt);
  }

  isValidHash(data: string, filter: string) {
    return bcrypt.compareSync(data, filter);
  }
}
