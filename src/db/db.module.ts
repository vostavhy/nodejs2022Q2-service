import { Module } from '@nestjs/common';
import { DBService } from './db.service';

@Module({
  exports: [DBService],
  providers: [DBService],
})
export class DbModule {}
