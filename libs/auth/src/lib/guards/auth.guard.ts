import { ExecutionContext, Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean;

    if (result) {
      const request = context.switchToHttp().getRequest();

      await super.logIn(request);
    }

    return result;
  }
}

export const UseAuthGuard = () => UseGuards(new LocalAuthGuard());
