import { Expose, plainToInstance, Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateIf,
  validateSync,
} from 'class-validator';

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

export const logLevels = {
  [LogLevel.Error]: 0,
  [LogLevel.Info]: 1,
  [LogLevel.Debug]: 2,
  [LogLevel.Verbose]: 3,
};

export class EnvironmentVariables {
  @Expose()
  @IsEnum(Environment)
  NODE_ENV: Environment = Environment.Development;

  @Expose()
  @IsNumber()
  @Min(0)
  @Max(65535)
  PORT: number = 3000;

  // Logging configuration
  @Expose()
  @IsOptional()
  @Transform(({ value }) => value.split(',').map((v: string) => v.trim()))
  LOG_TRANSPORTS: Array<'console' | 'file'> = ['console', 'file'];

  @Expose()
  @IsOptional()
  @IsEnum(LogLevel)
  LOG_LEVEL: LogLevel = LogLevel.Verbose;

  @Expose()
  @IsOptional()
  @IsString()
  @ValidateIf((o) => o.LOG_TRANSPORTS?.includes('file'))
  LOG_PATH?: string = './logs/logging.log';

  // Database configuration
}

export function validateEnvironment(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
    excludeExtraneousValues: true,
    exposeDefaultValues: true,
  });
  console.log(validatedConfig);
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
