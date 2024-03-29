import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger();

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, baseUrl, query, body } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const { statusCode, statusMessage } = response;
      const contentLength = response.get('content-length');

      const params = [method, statusCode, statusMessage, baseUrl];

      if (Object.keys(query).length !== 0) {
        params.push(`query:${JSON.stringify(query)}`);
      }

      if (Object.keys(body).length !== 0) {
        params.push(`body:${JSON.stringify(body)}`);
      }

      params.push(contentLength);
      params.push(userAgent);
      params.push(ip);

      if (statusCode > 300) {
        this.logger.error(params.join(' '));
      } else {
        this.logger.log(params.join(' '));
      }
    });

    next();
  }
}
