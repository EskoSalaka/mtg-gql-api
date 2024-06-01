import { Injectable, Logger, LoggerService } from '@nestjs/common';

@Injectable()
export class SequelizeLoggerService {
  private logger = new Logger('Sequelize');

  log(query: string, duration?: number) {
    // Log the query and duration using your logger
    this.logger.log(`Query: ${query}, Duration: ${duration}ms`);
  }

  debug(query: string, duration?: number) {
    // Log the query and duration using your logger
    this.logger.log(`Query: ${query}, Duration: ${duration}ms`);
  }

  error(error: Error) {
    // Log the error using your logger
    this.logger.error(error);
  }

  warn(message: any, ...optionalParams: any[]) {}

  fatal(message: any, ...optionalParams: any[]) {}
}
