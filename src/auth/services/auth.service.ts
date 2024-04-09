import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDTO } from '../dto/login.dto';
import { UserService } from 'src/user/services/user.crud';
import { User } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}


  async getUserByEmail(email: string): Promise<User | null> {
    try {
      return this.userRepository.findOne({
        where: { email: email },
      });
    } catch (e) {
      //throw new Error("Error in getUserByEmail auth.service");
      throw e
    }
  }

  async login(loginDto: LoginDTO) {
    const { email, password } = loginDto;
    // Find the user by email
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}

