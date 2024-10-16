import { Body, Post, Param } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { LogService } from './log.service'; // Import the LogService

// interface LogsApi {
//   logs: Log[];
// }

interface Log {
  level: string;
  message: string;
  timestamp: string;
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logService: LogService, // Inject the LogService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('add/log/:id')
  async getLogs(@Param('id') id: string, @Body() log: Log) {
    console.log(id);
    return await this.logService.createLog(
      log.level,
      log.message,
      log.timestamp,
    );
  }
}
