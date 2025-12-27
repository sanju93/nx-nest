import {
  Controller,
  Get,
  Req,
  Res,
  HttpStatus,
  Session,
  Post,
  Body,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtGuard, AuthDto } from '@nx-nest/auth';

@JwtGuard()
@Controller('notes')
export class NotesQueryController {
  @Post('')
  putNotes(@Req() req: Request) {
    return { message: 'logged in' };
  }

  @Get('')
  getNotes() {
    return { data: 'success' };
  }
}
