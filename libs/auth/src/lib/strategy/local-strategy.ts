import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class PassportLocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor() {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string) {
    return { email, password };
  }
}

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: any, done: Function) {
    console.log(user);
    done(null, user.email); // store user.id in session
  }

  async deserializeUser(payload: any, done: Function) {
    // In real apps, fetch from DB
    const user = { username: payload.email };
    done(null, user);
  }
}
