import { Global, Logger, Module, ValidationPipe } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import * as path from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { CardModule } from './card/card.module';
import { SetModule } from './set/set.module';
import { HttpModule } from '@nestjs/axios';
import { ServerUtilsModule } from './server-utils/server-utils.module';
import { CardFace } from './card/models/card-face.model';
import { Card } from './card/models/card.model';
import { Set } from './set/models/set.model';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { APP_PIPE } from '@nestjs/core';
import { SequelizeLoggerService } from './sequelize-logger.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvironmentVariables, logLevels, validateEnvironment } from './environment.config';

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
          uri: config.get('DB_URI'),
          synchronize: config.get('DB_SYNCHRONIZE'),
          logging: (sql, timimgs) => logger.verbose(sql),
          autoLoadModels: true,
          models: [Card, CardFace, Set],
          repositoryMode: false,
          ssl: true,
        };
      },
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
    }),
    ServerUtilsModule,
    HttpModule,
    CardModule,
    SetModule,
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
