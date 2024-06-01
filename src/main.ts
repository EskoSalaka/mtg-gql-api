import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

    const configService = app.get(ConfigService);

    await app.listen(configService.get('PORT'));
  } catch (e) {
    console.log('Error starting Nestjs server...');
    console.error(e);
  }
}
bootstrap();
