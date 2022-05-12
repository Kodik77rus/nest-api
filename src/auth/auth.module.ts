import { Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';
import { CryptoModule } from '../crypto/crypto.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth-guard';

@Module({
  imports: [UserModule, CryptoModule],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard],
  exports: [AuthService, JwtAuthGuard],
})
export class AuthModule {}
