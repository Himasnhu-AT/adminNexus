import { Test, TestingModule } from '@nestjs/testing';
import { QueueWorkerService } from './queue-worker.service';
import { LogService } from './log.service';
import { PrismaService } from './prisma.service';
import * as amqp from 'amqplib';

describe('QueueWorkerService', () => {
  let service: QueueWorkerService;
  let logService: LogService;
  let channel: amqp.Channel;
  let connection: amqp.Connection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QueueWorkerService,
        LogService,
        PrismaService,
        {
          provide: LogService,
          useValue: {
            createLog: jest.fn().mockResolvedValue({
              id: '1',
              level: 'info',
              message: 'Test log message',
              timestamp: new Date().toISOString(),
            }),
          },
        },
      ],
    }).compile();

    service = module.get<QueueWorkerService>(QueueWorkerService);
    logService = module.get<LogService>(LogService);

    channel = {
      assertQueue: jest.fn(),
      consume: jest.fn(),
      ack: jest.fn(),
      close: jest.fn(),
    } as any;

    connection = {
      createChannel: jest.fn().mockResolvedValue(channel),
      close: jest.fn(),
    } as any;

    jest.spyOn(amqp, 'connect').mockResolvedValue(connection);
  });

  it('should be defined', async () => {
    await service.onModuleInit();
    expect(service).toBeDefined();
  });

  it('should process messages from the queue and save them to the database', async () => {
    const log = {
      level: 'info',
      message: 'Test log message',
      timestamp: new Date().toISOString(),
    };

    const msg = {
      content: Buffer.from(JSON.stringify(log)),
    };

    (channel.consume as jest.Mock).mockImplementationOnce(
      (queue, onMessage) => {
        onMessage(msg);
      },
    );

    await service.onModuleInit();

    expect(logService.createLog).toHaveBeenCalledWith(
      log.level,
      log.message,
      log.timestamp,
    );
    expect(channel.ack).toHaveBeenCalledWith(msg);
  });

  afterEach(async () => {
    await service.onModuleDestroy();
  });
});
