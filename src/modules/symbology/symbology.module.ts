import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Symbology } from './models/symbology.model';
import { SymbologyResolver } from './symbology.resolver';

@Module({
  imports: [SequelizeModule.forFeature([Symbology])],
  providers: [SymbologyResolver],
  exports: [SequelizeModule],
})
export class SymbologyModule {}
