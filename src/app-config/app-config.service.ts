import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}
  get port(): number {
    return Number(this.configService.get<number>('app-config.port'));
  }
  get mongoUser(): string {
    return this.configService.get<string>('app-config.database.user');
  }
  get userPwd(): string {
    return this.configService.get<string>('app-config.database.userPwd');
  }
  get dbHost(): string {
    return this.configService.get<string>('app-config.database.host');
  }
  get dbName(): string {
    return this.configService.get<string>('app-config.database.dbName');
  }
  get dbport(): number {
    return Number(this.configService.get<number>('app-config.database.port'));
  }
}
