import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DbConfigService } from './db.service';
import { AppConfigModule } from '../app-config/app-config.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      useClass: DbConfigService,
    }),
  ],
})
export class DbModule {}
