import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvService {
  readonly AUTH0_SERVER_DOMAIN_URL = this.cfg.get('AUTH0_SERVER_URL');
  readonly AUTH0_SERVER_CLIENT_ID = this.cfg.get('AUTH0_SERVER_CLIENT_ID');
  readonly AUTH0_SERVER_SECRET_ID = this.cfg.get('AUTH0_SERVER_CLIENT_SECRET');
  readonly AUTH0_SERVER_CALLBACK_URL = this.cfg.get(
    'AUTH0_SERVER_CALLBACK_URL'
  );
  readonly AUTH0_SERVER_API_AUDIENCE = this.cfg.get(
    'AUTH0_SERVER_API_AUDIENCE'
  );

  constructor(private cfg: ConfigService) {}
}
