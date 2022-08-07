import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('CUSTOM LOGGER');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, baseUrl, query, body } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const { statusCode, statusMessage } = response;
      const contentLength = response.get('content-length');

      this.logger.log(
        `${method} ${statusCode} ${statusMessage} ${baseUrl} query:${JSON.stringify(
          query,
        )} body:${JSON.stringify(body)} ${contentLength} - ${userAgent} ${ip}`,
      );
    });

    next();
  }
}
