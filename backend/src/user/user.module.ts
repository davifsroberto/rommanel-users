import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { UserService } from './services/user.service';
import { AdressSchema } from './schemas/address.schema';
import { UserSchema } from './schemas/user.schema';
import { UsersController } from './controllers/users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
      {
        name: 'Address',
        schema: AdressSchema
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UserService],
})
export class UserModule {}
