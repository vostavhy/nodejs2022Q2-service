import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
