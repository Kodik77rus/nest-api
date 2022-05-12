import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { CreateUserDto as UserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class CryptoService {
  constructor(private readonly jwtservice: JwtService) {}

  private salt = bcrypt.genSaltSync(7);

  generateAcсessToken(data: UserDto) {
    const payload = { name: data.name };
    return this.jwtservice.sign(payload);
  }

  hashData(data: string) {
    return bcrypt.hashSync(data, this.salt);
  }

  isValidHash(data, data2) {
    return bcrypt.compareSync(data, data2);
  }
}
