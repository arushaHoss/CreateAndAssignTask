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
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { TeamService } from '../services/team.crud';
import { CreateTeamDTO } from '../dto/create-team.dto';
import { Team } from '../entities/team.entity';


@Controller('team')
@UseGuards(JwtAuthGuard)
export class TeamController {
    constructor(private teamService: TeamService) { }

    @Post('create')
    public async createTeam(@Body() createTeamDto: CreateTeamDTO): Promise<Team> {
        return await this.teamService.createTeam(createTeamDto);
    }

}
