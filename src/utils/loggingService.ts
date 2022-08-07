import { ConsoleLogger, LogLevel } from '@nestjs/common';

export class MyLogger extends ConsoleLogger {
  error(message: any, stack?: string, context?: string) {
    const args = [message, stack, context] as const;
    super.error(...args);
  }

  warn(message: any, stack?: string, context?: string) {
    const args = [message, stack, context] as const;
    super.warn(...args);
  }

  log(message: any, stack?: string, context?: string) {
    const args = [message, stack, context] as const;
    super.log(...args);
  }
}

export const getLogLevels = (isProduction: boolean): LogLevel[] => {
  if (isProduction) {
    return ['log', 'warn', 'error'];
  }
  return ['error', 'warn', 'log', 'verbose', 'debug'];
};
