import { NestFactory } from '@nestjs/core';
import { AppConfigService } from './app-config/app-config.service';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );
  await app.init();

  const appConfig = app.get(AppConfigService);

  await app.listen(appConfig.port);
}

bootstrap();
