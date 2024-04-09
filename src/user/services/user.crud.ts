import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDTO } from '../dto/create-user.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { error } from 'console';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async createUser(input: CreateUserDTO): Promise<User> {
    try{
      const oldUser = await this.userRepository.findOne({where: {email: input.email}});

      if(oldUser){
      throw new ConflictException('User already exists')
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(input.password, 10);

      // Create a new user entity with the hashed password
      const newUser = this.userRepository.create({
        email: input.email,
        firstName: input.firstName,
        lastName: input.lastName,
        password: hashedPassword,
      });

      // Save the user to the database
      return await this.userRepository.save(newUser);
    }catch(e){
      throw e;
    }
     
  }

  // public async getUsers(): Promise<User[]> {
  //   return await this.userRepository.find();
  // }

  // public async getUser(userId: number): Promise<User> {
  //   return await this.userRepository.findOne({
  //     where: { id: userId },
  //   });
  // }

  // public async editUser(
  //   userId: number,
  //   createUserDto: CreateUserDTO,
  // ): Promise<User> {
  //   const editedUser = await this.userRepository.findOne({
  //     where: { id: userId },
  //   });

  //   if (!editedUser) {
  //     throw new NotFoundException('User not found');
  //   }
  //   const result = await this.userRepository.update(
  //     { id: userId },
  //     createUserDto,
  //   );
  //   console.log(result);
  //   return editedUser;
  // }

  // public async deleteUser(userId: number): Promise<void> {
  //   await this.userRepository.delete(userId);
  // }
}
