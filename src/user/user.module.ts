import { Module } from '@nestjs/common';
import { UserService } from './services/user.crud';
import { UserController } from './controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  // imports: [],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
