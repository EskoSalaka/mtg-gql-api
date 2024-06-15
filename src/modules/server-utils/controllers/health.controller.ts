import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { Sequelize } from 'sequelize-typescript';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private sequelize: Sequelize,
  ) {}

  @Get()
  @HealthCheck()
  async check() {
    let sequelizeStatus;

    try {
      await this.sequelize.authenticate();
      sequelizeStatus = 'up';
    } catch (e) {
      sequelizeStatus = 'down';
    }

    return this.health.check([async () => ({ sequelize: { status: sequelizeStatus } })]);
  }
}
