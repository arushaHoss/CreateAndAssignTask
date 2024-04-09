import {
    Controller,
    Post,
    Body,
    Get,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { TaskService } from '../services/task.crud';
import { CreateTaskDto } from '../dto/create-task.dto';
import { Task } from '../entities/task.entity';
import { AssignTaskDto } from '../dto/assign-task.dto';
import { TaskQueryInput } from '../dto/query-task.inut.ts';
import { UpdateTaskDto } from '../dto/update-task.dto';


@Controller('task')
@UseGuards(JwtAuthGuard)
export class TaskController {
    constructor(private taskService: TaskService) { }

    @Post('create')
    public async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return await this.taskService.createTask(createTaskDto);
    }

    @Post('createmultiple')
    public async createMultipleTask(@Body() createTaskDto: CreateTaskDto[]): Promise<Task[]> {
      const tasks = await this.taskService.createMultipleTasks(createTaskDto);
      return tasks;
    }

    @Post('assign')
    public async assignTask(@Body() assignTaskDto: AssignTaskDto): Promise<Task> {
      const tasks = await this.taskService.assignTask(assignTaskDto);
      return tasks;
    }

    @Get('findAll')
    async findAllTasks(@Body() taskQueryInput: TaskQueryInput): Promise<Task[]> {
    return this.taskService.findAllTask(taskQueryInput);
    }

    @Post('update')
    public async updateTask(@Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
        return this.taskService.updateTask(updateTaskDto);
      
    }

}
