import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import * as jwksRsa from 'jwks-rsa';
import { EnvService } from '@nx-nest/env';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(env: EnvService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      issuer: `${env.AUTH0_SERVER_DOMAIN_URL}/`,
      audience: env.AUTH0_SERVER_API_AUDIENCE,
      algorithms: ['RS256'],
      passReqToCallback: true,
      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${env.AUTH0_SERVER_DOMAIN_URL}/.well-known/jwks.json`,
      }),
    });
  }

  authenticate(req: Request, options) {
    if (!req.headers.authorization) {
      throw new UnauthorizedException('Missing Authorization Header');
    }

    super.authenticate(req, options);
  }

  validate(req: Request, payload: any) {
    return payload;
  }
}
