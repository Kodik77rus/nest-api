import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { RefresTokenInterceptor } from '../auth/auth.interceptor';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
@UseInterceptors(RefresTokenInterceptor)
export class UserController {
  constructor(private readonly service: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':name')
  async find(@Param('name') userId: string) {
    return await this.service.find(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() user: CreateUserDto) {
    return await this.service.create(user);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':name')
  async update(@Param('name') id: string, @Body() user: UpdateUserDto) {
    return await this.service.update(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':name')
  async delete(@Param('name') name: string) {
    return await this.service.delete(name);
  }
}
