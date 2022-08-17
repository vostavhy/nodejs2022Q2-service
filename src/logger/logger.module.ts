import { Module } from '@nestjs/common';
import { MyLogger } from 'src/utils/loggingService';

@Module({
  providers: [MyLogger],
  exports: [MyLogger],
})
export class LoggerModule {}
