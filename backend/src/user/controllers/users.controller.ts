import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Address } from '../models/address.model';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    return this.userService.getUser(id);
  }

  @Post()
  async postUser(@Body() user: User): Promise<User> {
    return this.userService.postUser(user);
  }

  @Put(':id')
  async putUser(@Param('id') id: string, @Body() user: User): Promise<User> {
    return this.userService.putUser(id, user);
  }

  @Put(':userId/address')
  async putAddress(
    @Param('userId') userId: string,
    @Body() address: Address,
  ): Promise<void> {
    return this.userService.putAddress(userId, address);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<object> {
    return this.userService.deleteUser(id);
  }
}
