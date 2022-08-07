import { ConsoleLogger, LogLevel } from '@nestjs/common';
import { writeLog } from './loggingFiles';

export class MyLogger extends ConsoleLogger {
  error(message: any, stack?: string, context?: string) {
    super.error(message);
    writeLog(message);
  }

  warn(message: any, stack?: string, context?: string) {
    super.warn(message);
    writeLog(message);
  }

  log(message: any, stack?: string, context?: string) {
    super.log(message);
    writeLog(message);
  }
}

export const getLogLevels = (isProduction: boolean): LogLevel[] => {
  if (isProduction) {
    return ['log', 'warn', 'error'];
  }
  return ['error', 'warn', 'log', 'verbose', 'debug'];
};
