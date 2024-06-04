import { Catch, HttpException, Logger, type ArgumentsHost } from '@nestjs/common';
import { GqlArgumentsHost, type GqlExceptionFilter } from '@nestjs/graphql';

@Catch()
export class GlobalExceptionFilter implements GqlExceptionFilter {
  private logger = new Logger();

  catch(exception: HttpException, host: ArgumentsHost) {
    this.logger.error('excEEEEEption');

    if (host.getType() === 'http') {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();

      const status = exception.getStatus();
      const message = exception.getResponse();

      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message,
      });
    } else {
      this.logger.error('GQL exception caught');
      this.logger.error(exception);
      return exception;
    }

    return exception;
  }
}
