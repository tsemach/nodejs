// cats.module.ts
import { Module } from '@nestjs/common';
import { LoggerModule } from '../logger';
import { CatsService } from './cats.service';

@Module({
  imports: [LoggerModule.forFeature('CatsModule')],
  providers: [CatsService],
})
export class CatsModule {}
