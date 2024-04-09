import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { error } from 'console';
import { Team } from '../entities/team.entity';
import { CreateTeamDTO } from '../dto/create-team.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
  ) {}

  public async createTeam(input: CreateTeamDTO): Promise<Team> {
    const { name, userIds } = input;

    try {
        // Create a new team object
        const newTeam = this.teamRepository.create({
            name,
            users: userIds.map(id => ({ id })),
        });

        // Save the team to the database
        return await this.teamRepository.save(newTeam);
      }  catch (e) {
      throw e;
    }
  }
}
