import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { CryptoService } from '../crypto/crypto.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly cryptoService: CryptoService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        return false;
      }

      const user = this.cryptoService.verifyToken(token);
      req.user = user;

      return true;
    } catch (e) {
      return false;
    }
  }
}
