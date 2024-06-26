import type { ApolloServerPlugin } from '@apollo/server';
import { Plugin } from '@nestjs/apollo';
import { Logger } from '@nestjs/common';

@Plugin()
export class GQLReqLoggingPlugin implements ApolloServerPlugin {
  private logger = new Logger('REQ');

  async requestDidStart(requestContext) {
    let logger = this.logger;

    if (requestContext.request.operationName !== 'IntrospectionQuery') {
      logger.debug(
        'GQL req received. OperationName: ' +
          requestContext.request.operationName +
          '\n' +
          requestContext?.request?.query,
      );
      logger.debug('GQL req variables: ' + JSON.stringify(requestContext?.request?.variables));
    }

    return {
      async willSendResponse(requestContext) {
        if (requestContext.request.operationName !== 'IntrospectionQuery') {
          if (!requestContext.errors) {
            logger.debug('GQL req finished successfully');
          } else {
            logger.debug('GQL req finished with errors');
          }
        }
      },
    };
  }
}
