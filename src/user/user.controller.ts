import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get(':name')
  async find(@Param('name') userId: string) {
    return await this.service.find(userId);
  }

  @Post()
  async create(@Body() user: CreateUserDto) {
    return await this.service.create(user);
  }

  @Put(':name')
  async update(@Param('name') id: string, @Body() user: UpdateUserDto) {
    return await this.service.update(id, user);
  }

  @Delete(':name')
  async delete(@Param('name') name: string) {
    return await this.service.delete(name);
  }
}
