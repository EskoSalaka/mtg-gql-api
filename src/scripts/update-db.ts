import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { DBUpdateService } from 'src/modules/server-utils/services/db-update.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  await app.init();

  let dbUpdateService = app.get(DBUpdateService);

  await dbUpdateService.updateDb();

  process.kill(process.pid, 'SIGTERM');
}

bootstrap();
