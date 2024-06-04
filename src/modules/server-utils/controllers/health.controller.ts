import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, SequelizeHealthIndicator } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private dbHealth: SequelizeHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([() => this.dbHealth.pingCheck('database')]);
  }
}
