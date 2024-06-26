import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.crud';
import { CreateUserDTO } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import {JwtAuthGuard} from "../../auth/guards/jwt-auth.guard";


@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  public async createUser(@Body() createUserDto: CreateUserDTO): Promise<User> {
    return await this.userService.createUser(createUserDto);
  }

  // @Get('all')
  // public async getUsers(): Promise<User[]> {
  //   return await this.userService.getUsers();
  // }

  // @Get('/:userId')
  // public async getUser(@Param('userId') userId: number) {
  //   return await this.userService.getUser(userId);
  // }

  // @Patch('/edit/:userId')
  // public async editUser(
  //   @Body() createUserDto: CreateUserDTO,
  //   @Param('userId') userId: number,
  // ): Promise<User> {
  //   return await this.userService.editUser(userId, createUserDto);
  // }

  // @Delete('/delete/:userId')
  // public async deleteUser(@Param('userId') userId: number) {
  //   return await this.userService.deleteUser(userId);
  // }
}
