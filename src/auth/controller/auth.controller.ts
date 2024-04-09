import { Controller, Get, Post, Request, UseGuards, Res, Query, Body, BadGatewayException } from '@nestjs/common';
import { Response } from 'express'
import {AuthService} from "../services/auth.service";
import { LoginDTO } from '../dto/login.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDTO) {
    return this.authService.login(loginDto);
  }
}
