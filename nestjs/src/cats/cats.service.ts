// cats.service.ts
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  constructor(
    @Inject('CONTEXT_LOGGER')
    private readonly logger: { log: (msg: string) => void },
  ) {}

  createCat() {
    this.logger.log('Creating a new cat...');
  }
}
