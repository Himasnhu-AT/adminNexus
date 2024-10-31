import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import * as amqp from 'amqplib';

@Injectable()
export class LogService {
  private connection: amqp.Connection;
  private channel: amqp.Channel;
  private readonly queue = 'logs';

  constructor(private prisma: PrismaService) {
    this.initializeQueue();
  }

  private async initializeQueue() {
    this.connection = await amqp.connect('amqp://localhost');
    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue(this.queue, { durable: true });
  }

  async createLog(level: string, message: string, timestamp: string) {
    const log = { level, message, timestamp };
    this.channel.sendToQueue(this.queue, Buffer.from(JSON.stringify(log)), {
      persistent: true,
    });
  }
}
