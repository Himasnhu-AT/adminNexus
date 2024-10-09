import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class LogService {
  constructor(private prisma: PrismaService) {}

  async createLog(level: string, message: string, timestamp: string) {
    return this.prisma.log.create({
      data: {
        level,
        message,
        timestamp: new Date(timestamp),
      },
    });
  }
}
