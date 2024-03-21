import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { LoggerModule } from './logger';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [LoggerModule.forRoot({ level: 'debug' }), CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
