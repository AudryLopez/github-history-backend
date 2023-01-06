import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { setHeader } from 'src/utils/header.middleware';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from '../config/config.service';
import { Configuration } from '../config/config.keys';
import { GithubModule } from 'src/modules/github/github.module';

@Module({
  imports: [GithubModule, ConfigModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  static port: number | string;

  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(Configuration.PORT);
  }
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(setHeader).forRoutes('*');
  }
}
