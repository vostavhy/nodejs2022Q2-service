import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { getLogLevels, MyLogger } from './utils/loggingService';
import { HttpExceptionFilter } from './utils/exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const port = process.env.PORT || 4000;
  const logLevel = process.env.LOG_LEVEL || 'production';

  const app = await NestFactory.create(AppModule, {
    logger: getLogLevels('production' === logLevel),
    bufferLogs: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Music service title')
    .setDescription('Music service API description')
    .setVersion('1.0')
    .addTag('music')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useLogger(app.get(MyLogger));

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.listen(port);
}
bootstrap();
