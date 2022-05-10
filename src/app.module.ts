import { Module } from '@nestjs/common';
import { AppConfigModule } from './app-config/app-config.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [AppConfigModule, DbModule],
})
export class AppModule {}
