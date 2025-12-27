import { NestMiddleware, Injectable } from '@nestjs/common';
// import * as Session from 'express-session';
// import passport = require('passport');

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    next();
  }
}
