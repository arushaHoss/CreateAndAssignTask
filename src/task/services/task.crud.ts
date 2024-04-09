import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { AssignTaskDto } from '../dto/assign-task.dto';
import { User } from 'src/user/entities/user.entity';
import { TaskQueryInput } from '../dto/query-task.inut.ts';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  public async createTask(input: CreateTaskDto): Promise<Task> {
    const { description, status, due_date, userIds } = input;

    try {
      const assignees = userIds ? userIds.map(id => ({ id })) : undefined;

      const newTask = this.taskRepository.create({
        description,
        status,
        due_date,
        assignees
      });

      return await this.taskRepository.save(newTask);
    } catch (e) {
      throw e;
    }
  }

  public async createMultipleTasks(inputs: CreateTaskDto[]): Promise<Task[]> {
    try {
      const tasks: Task[] = [];

      // Iterate over each input and create a task
      for (const input of inputs) {
        const task = await this.createTask(input);
        tasks.push(task);
      }

      return tasks;
    } catch (e) {
      throw e;
    }
  }

  async assignTask(input: AssignTaskDto): Promise<Task> {

    try {
      const { userIds, taskId } = input
      const assignees = userIds ? await this.userRepository.find({ where: { id: In(userIds) } }) : [];

      const task = await this.taskRepository.findOne({ where: { id: taskId }, relations: ['assignees'] });
      if (!task) {
        throw new NotFoundException(`Task with ID ${taskId} not found`);
      }

      // Assign the fetched users to the task
      task.assignees = assignees;

      // Save the updated task
      await this.taskRepository.save(task);

      // Return the updated task with relations
      return await this.taskRepository.findOne({ where: { id: taskId }, relations: ['assignees'] });
    } catch (e) {
      throw e
    }

  }

  async findAllTask(query: TaskQueryInput): Promise<Task[]> {
    try {
      const { skip, take } = query;

      const result = await this.taskRepository.find({
        skip,
        take,
        relations: ['assignees']
      });

      return result;
    } catch (e) {
      throw e
    }

  }

  async updateTask(input: UpdateTaskDto): Promise<Task> {

    try {

      const task = await this.taskRepository.findOne({ where: { id: input.id }, relations: ['assignees'] });
      if (!task) {
        throw new NotFoundException(`Task with ID ${input.id} not found`);
      }

      const updatedTask = { ...task, ...input };

      await this.taskRepository.save(updatedTask);

      return await this.taskRepository.findOne({ where: { id: input.id } });
    } catch (e) {
      throw e
    }

  }

}
