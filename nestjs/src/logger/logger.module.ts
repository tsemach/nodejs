import { DynamicModule, Module } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Module({})
export class LoggerModule {
  static forRoot(options: { level: string }): DynamicModule {
    return {
      module: LoggerModule,
      providers: [
        {
          provide: 'GLOBAL_LOGGER_OPTIONS',
          useValue: options,
        },
        {
          provide: 'LOGGER_SERVICE',
          useFactory: (opts) => {
            return new LoggerService(opts.level);
          },
          inject: ['GLOBAL_LOGGER_OPTIONS'],
        },
      ],
      exports: ['LOGGER_SERVICE'],
    };
  }

  static forFeature(context: string): DynamicModule {
    return {
      module: LoggerModule,
      imports: [LoggerModule.forRoot({ level: 'debug' })],
      providers: [
        {
          provide: 'CONTEXT_LOGGER',
          useFactory: (loggerService: LoggerService) => {
            return loggerService.createContextLogger(context);
          },
          inject: ['LOGGER_SERVICE'],
        },
      ],
      exports: ['CONTEXT_LOGGER'],
    };
  }
}
