import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { setHeader } from 'src/utils/header.middleware';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(setHeader).forRoutes('cats');
  }
}
