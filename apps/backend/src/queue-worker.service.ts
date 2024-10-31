import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { LogService } from './log.service';
import * as amqp from 'amqplib';

@Injectable()
export class QueueWorkerService implements OnModuleInit, OnModuleDestroy {
  private connection: amqp.Connection;
  private channel: amqp.Channel;
  private readonly queue = 'logs';

  constructor(private readonly logService: LogService) {}

  async onModuleInit() {
    this.connection = await amqp.connect('amqp://localhost');
    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue(this.queue, { durable: true });

    this.channel.consume(this.queue, async (msg) => {
      if (msg !== null) {
        const log = JSON.parse(msg.content.toString());
        await this.logService.createLog(log.level, log.message, log.timestamp);
        this.channel.ack(msg);
      }
    });
  }

  async onModuleDestroy() {
    await this.channel.close();
    await this.connection.close();
  }
}
