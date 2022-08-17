import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { getLogLevels, MyLogger } from './utils/loggingService';
import { HttpExceptionFilter } from './utils/exception.filter';

async function bootstrap() {
  const port = process.env.PORT || 4000;
  const logLevel = process.env.LOG_LEVEL || 'production';

  const app = await NestFactory.create(AppModule, {
    logger: getLogLevels('production' === logLevel),
    bufferLogs: true,
  });

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useLogger(app.get(MyLogger));

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.listen(port);
}
bootstrap();
