import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TaskService } from './services/task.crud';
import { TaskController } from './controller/task.controller';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, User])],
  // imports: [],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
