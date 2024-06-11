import { Global, Logger, Module, ValidationPipe } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import * as path from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { SetModule } from './modules/set/set.module';
import { HttpModule } from '@nestjs/axios';
import { ServerUtilsModule } from './modules/server-utils/server-utils.module';
import { CardFace } from './modules/card/models/card-face.model';
import { Card } from './modules/card/models/card.model';
import { Set } from './modules/set/models/set.model';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { APP_PIPE } from '@nestjs/core';
import { SequelizeLoggerService } from './sequelize-logger.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvironmentVariables, logLevels, validateEnvironment } from './environment.config';
import { Ruling } from './modules/ruling/models/ruling.model';
import { CardModule } from './modules/card/card.module';
import { LatestPrice, Price } from './modules/card/models/price.model';
import { RulingModule } from './modules/ruling/ruling.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnvironment,
    }),
    WinstonModule.forRootAsync({
      useFactory: (config: ConfigService<EnvironmentVariables>) => {
        let transports = [];

        if (config.get('LOG_TRANSPORTS').includes('file')) {
          transports.push(
            new winston.transports.File({
              level: config.get('LOG_LEVEL'),
              filename: config.get('LOG_PATH'),
              handleExceptions: true,
              format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.ms(),
                nestWinstonModuleUtilities.format.nestLike('MtgGql', {
                  colors: false,
                  prettyPrint: true,
                  processId: true,
                }),
              ),
            }),
          );
        }

        if (config.get('LOG_TRANSPORTS').includes('console')) {
          transports.push(
            new winston.transports.Console({
              level: config.get('LOG_LEVEL'),
              format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.ms(),
                nestWinstonModuleUtilities.format.nestLike('MtgGql', {
                  colors: true,
                  prettyPrint: true,
                  processId: true,
                }),
              ),
            }),
          );
        }

        return {
          levels: logLevels,
          transports,
        };
      },
      inject: [ConfigService],
    }),
    SequelizeModule.forRootAsync({
      imports: [],
      useFactory: (config: ConfigService<EnvironmentVariables>) => {
        let logger = new Logger('Sequelize');

        return {
          dialect: config.get('DB_DIALECT'),
          ...(config.get('DB_URI') ? { uri: config.get('DB_URI') } : {}),
          ...(config.get('DB_STORAGE') ? { storage: config.get('DB_STORAGE') } : {}),
          synchronize: config.get('DB_SYNCHRONIZE'),
          benchmark: true,
          logging: (sql, timimgs) => {
            logger.verbose(sql);
            logger.verbose('Benchmark: ' + timimgs + 'ms');
          },
          autoLoadModels: true,
          models: [Card, CardFace, Set, Ruling, Price, LatestPrice],
          repositoryMode: false,
          ssl: true,
        };
      },
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
      formatError: (error) => {
        const originalError = error.extensions?.originalError as Error;

        if (!originalError) {
          return {
            message: error.message,
            code: error.extensions?.code,
          };
        }
        return {
          message: originalError.message,
          code: error.extensions?.code,
        };
      },
    }),
    ServerUtilsModule,
    HttpModule,
    CardModule,
    SetModule,
    RulingModule,
  ],
  controllers: [],
  providers: [
    SequelizeModule,
    Logger,
    SequelizeLoggerService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidUnknownValues: true,
      }),
    },
  ],
  exports: [SequelizeModule],
})
export class AppModule {}
