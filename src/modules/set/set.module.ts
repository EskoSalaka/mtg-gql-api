import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SetResolver } from './set.resolver';
import { Set } from './models/set.model';
import { SetLoader } from './dataloaders/set.loader';
import { SetService } from './set.service';

@Module({
  imports: [SequelizeModule.forFeature([Set])],
  providers: [SetResolver, SetLoader, SetService],
  exports: [SequelizeModule, SetLoader, SetService],
})
export class SetModule {}
