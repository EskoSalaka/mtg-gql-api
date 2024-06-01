import { MiddlewareConsumer, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HttpModule } from '@nestjs/axios';
import { DBUpdateService } from './services/db-update.service';
import { Sequelize } from 'sequelize';
import { SetModule } from '../set/set.module';
import { CardModule } from 'src/card/card.module';
import { HTTPLoggerMiddleware } from './middleware/http-logger.middleware';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './controllers/health.controller';

@Module({
  imports: [SetModule, CardModule, SequelizeModule.forFeature(), TerminusModule, HttpModule],
  providers: [
    DBUpdateService,
    {
      provide: 'Sequelize',
      useValue: Sequelize,
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
