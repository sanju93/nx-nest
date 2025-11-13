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
import { UseAuthGuard, AuthDto } from '@nx-nest/auth';

@UseAuthGuard()
@Controller('notes')
export class NotesQueryController {
  @Post('')
  getNotes(
    @Req() req: Request,
    @Body() body: AuthDto,
    @Session() session: Record<string, any>
  ): string {
    console.log(req.user);
    return 'this is text';
  }
}
