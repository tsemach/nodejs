import { Inject, Injectable } from '@nestjs/common';
import { Logger } from '../logger';

@Injectable()
export class AppService {
  constructor(@Inject('CONTEXT_LOGGER') private readonly logger: Logger) {}

  getHello(): string {
    this.logger.log('hello worlkd is called');

    return 'Hello World!';
  }
}
