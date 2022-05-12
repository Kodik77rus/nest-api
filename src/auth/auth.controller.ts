import { Controller, Post, Body } from '@nestjs/common';

import { AuthService } from './auth.service';

import { CreateUserDto as UserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('/registration')
  async registrate(@Body() user: UserDto) {
    return await this.service.registrate(user);
  }

  @Post('/login')
  async logIn(@Body() user: UserDto) {
    return await this.service.logIn(user);
  }
}
