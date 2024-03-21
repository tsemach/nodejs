import { AppController } from './controllers/app.controller';
import { Application } from './application';
import { AppModule } from './app.module';
import { AppService } from './services/app.service';

async function bootstrap() {
  const app = await Application.instance.create<AppModule>(AppModule);
  const c = app.select(AppModule).get(AppController, { strict: true });
  const s = app.select(AppModule).get(AppService, { strict: true });
  console.log(c.getHello());
  console.log(s.getHello());

  await app.listen(3000);
}
bootstrap();
