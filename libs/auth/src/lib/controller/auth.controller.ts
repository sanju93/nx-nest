import { Controller, Post, Req, Body } from '@nestjs/common';
import { Request } from 'express';
import { UserModel } from '../models/auth.dto';
import { UserService } from '../service/user.service';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}
  @Post('signup')
  signup(@Req() req: Request, @Body() body: UserModel) {
    return this.userService.createUser(body);
  }
}
