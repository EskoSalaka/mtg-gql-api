import {
  Catch,
  HttpException,
  Logger,
  NotFoundException,
  type ArgumentsHost,
} from '@nestjs/common';
import { GqlArgumentsHost, type GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

@Catch(HttpException)
export class GlobalExceptionFilter implements GqlExceptionFilter {
  private logger = new Logger();

  catch(exception: HttpException, host: ArgumentsHost) {
    this.logger.error(exception);

    return exception;
  }
}
