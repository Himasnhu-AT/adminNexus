import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogService } from './log.service';
import { PrismaService } from './prisma.service';

describe('AppController', () => {
  let appController: AppController;
  let logService: LogService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
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

    appController = moduleRef.get<AppController>(AppController);
    logService = moduleRef.get<LogService>(LogService);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('add log', () => {
    it('should create a log and return it', async () => {
      const log = {
        level: 'info',
        message: 'Test log message',
        timestamp: new Date().toISOString(),
      };

      const result = await appController.getLogs('1', log);

      expect(result).toEqual({
        id: '1',
        level: 'info',
        message: 'Test log message',
        timestamp: expect.any(String),
      });

      expect(logService.createLog).toHaveBeenCalledWith(
        log.level,
        log.message,
        log.timestamp,
      );
    });
  });
});
