import { Module } from '@nestjs/common';

import { CryptoModule } from 'src/crypto/crypto.module';
import { MongooseModule } from '@nestjs/mongoose';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    CryptoModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema, collection: 'Users' },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, MongooseModule],
  exports: [UserService, MongooseModule],
})
export class UserModule {}
