import { NestFactory } from '@nestjs/core';
import { log } from 'console';
import { AppModule } from 'src/app.module';
import { DBUpdateService } from 'src/modules/server-utils/services/db-update.service';

async function bootstrap() {
  log('Starting database update...');
  const app = await NestFactory.createApplicationContext(AppModule);
  await app.init();

  let dbUpdateService = app.get(DBUpdateService);

  await dbUpdateService.updateDb();

  process.kill(process.pid, 'SIGTERM');
}

bootstrap();

export interface IScryfallBulkDataOptions {
  id: string;
  uri: string;
  type: string;
  name: string;
  description: string;
  download_uri: string;
  updated_at: string;
  size: number;
  content_type: string;
  content_encoding: string;
}