import { Expose, plainToInstance, Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateIf,
  validateSync,
} from 'class-validator';
import { Dialect } from 'sequelize';

export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

export enum LogLevel {
  Error = 'error',
  Info = 'info',
  Debug = 'debug',
  Verbose = 'verbose',
}

export const logTransports = ['console', 'file'] as const;
export type LogTransport = (typeof logTransports)[number];

export const logLevels = {
  [LogLevel.Error]: 0,
  [LogLevel.Info]: 1,
  [LogLevel.Debug]: 2,
  [LogLevel.Verbose]: 3,
};

export enum SupportedDialects {
  Postgres = 'postgres',
  Sqlite = 'sqlite',
}

export class EnvironmentVariables {
  @Expose()
  @IsEnum(Environment, {
    message: 'NODE_ENV must be one of: development, production, test, provision',
  })
  NODE_ENV: Environment = Environment.Development;

  @Expose()
  @IsOptional()
  @IsBoolean({})
  @Transform(({ value }) => value === 'true' || value === '1')
  APOLLO_PLAYGROUND: boolean = true;

  @Expose()
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value))
  APOLLO_DEPTH_LIMIT: number = 5;

  @Expose()
  @IsNumber()
  @Min(0)
  @Max(65535)
  @Transform(({ value }) => parseInt(value))
  PORT: number = 3000;

  // Logging configuration
  @Expose()
  @IsOptional()
  @Transform(({ value }) => value.split(',').map((v: string) => v.trim()))
  @IsIn(logTransports, {
    each: true,
    message: 'LOG_TRANSPORTS must be one or many of: console, file',
  })
  LOG_TRANSPORTS: Array<LogTransport> = ['console', 'file'];

  @Expose()
  @IsOptional()
  @IsEnum(LogLevel, { message: 'LOG_LEVEL must be one of: error, info, debug, verbose' })
  LOG_LEVEL: LogLevel = LogLevel.Verbose;

  @Expose()
  @IsOptional()
  @IsString()
  @ValidateIf((o) => o.LOG_TRANSPORTS?.includes('file'))
  LOG_PATH?: string = './logs';

  @Expose()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value))
  LOG_MAX_SIZE: number = 50000000;

  @Expose()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value))
  LOG_MAX_FILES: number = 10;

  // Database configuration
  @Expose()
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === '1')
  DB_SYNCHRONIZE: boolean = false;

  @Expose()
  @IsOptional()
  @IsString()
  DB_URI: string;
}

export function validateEnvironment(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    excludeExtraneousValues: true,
    exposeDefaultValues: true,
  });
  console.log(validatedConfig);
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw errors;
  }
  return validatedConfig;
}
