import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AppConfigModule } from '../app-config/app-config.module';
import { AppConfigService } from '../app-config/app-config.service';
import { CryptoService } from './crypto.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      useFactory: async (configService: AppConfigService) => ({
        secret: configService.jwtSecret,
        signOptions: {
          expiresIn: configService.tokenLifetime,
        },
      }),
      inject: [AppConfigService],
    }),
  ],
  providers: [CryptoService],
  exports: [CryptoService],
})
export class CryptoModule {}
