import { Module } from '@nestjs/common';
import { GithubService } from './github.service';
import { GithubController } from './github.controller';
import { HttpModule } from '@nestjs/axios';
import { AxiosService } from 'src/utils/axios/axios.service';
import { AxiosModule } from '../../utils/axios/axios.module';
import { ConfigService } from '../../config/config.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [GithubController],
  providers: [GithubService, AxiosService, ConfigService],
})
export class GithubModule {}
