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

  @Put(':id/token')
  async updateToken(@Param('id') userId: string) {
    return await this.service.updateToken(userId);
  }

  @Get(':id')
  async find(@Param('id') userId: string) {
    return await this.service.find(userId);
  }

  @Post()
  async create(@Body() user: CreateUserDto) {
    return await this.service.create(user);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() user: UpdateUserDto) {
    return await this.service.update(id, user);
  }

  @Delete(':id')
  async delete(@Param('name') name: string) {
    return await this.service.delete(name);
  }
}
