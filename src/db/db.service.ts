import { Injectable } from '@nestjs/common';
import {
  MongooseOptionsFactory,
  MongooseModuleOptions,
} from '@nestjs/mongoose';

import { AppConfigService } from '../app-config/app-config.service';

@Injectable()
export class DbConfigService implements MongooseOptionsFactory {
  constructor(private readonly appConfig: AppConfigService) {}

  private mongoUser = this.appConfig.mongoUser;
  private userPwd = this.appConfig.userPwd;
  private dbHost = this.appConfig.dbHost;
  private dbport = this.appConfig.dbport;

  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: `mongodb://${this.mongoUser}:${this.userPwd}@${this.dbHost}:${this.dbport}`,
    };
  }
}
