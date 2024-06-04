import { Catch, HttpException, Logger, type ArgumentsHost } from '@nestjs/common';
import type { GqlExceptionFilter } from '@nestjs/graphql';

@Catch(HttpException)
export class GlobalExceptionFilter implements GqlExceptionFilter {
  private logger = new Logger();

  catch(exception: HttpException, host: ArgumentsHost) {
    this.logger.error(exception);

    return exception;
  }
}
