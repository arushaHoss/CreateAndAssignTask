import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { TeamService } from './services/team.crud';
import { TeamController } from './controller/team.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Team])],
  // imports: [],
  providers: [TeamService],
  controllers: [TeamController],
})
export class TeamModule {}
