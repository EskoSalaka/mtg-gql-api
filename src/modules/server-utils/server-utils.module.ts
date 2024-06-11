import { MiddlewareConsumer, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DBUpdateService } from './services/db-update.service';
import { SetModule } from '../set/set.module';
import { HTTPLoggerMiddleware } from './middleware/http-logger.middleware';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './controllers/health.controller';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './filters/global-exception-filter';
import { GQLReqLoggingPlugin } from './plugings/gqlLogger';
import { CardModule } from '../card/card.module';
import { RulingModule } from '../ruling/ruling.module';

@Module({
  imports: [SetModule, CardModule, RulingModule, TerminusModule, HttpModule],
  providers: [
    DBUpdateService,
    GQLReqLoggingPlugin,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
  controllers: [HealthController],
  exports: [DBUpdateService],
})
export class ServerUtilsModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(HTTPLoggerMiddleware).forRoutes('*');
  }
}
