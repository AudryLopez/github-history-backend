import { AxiosService } from './axios.service';
import { Module } from '@nestjs/common';
import { ConfigService } from '../../config/config.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [
    {
      provide: AxiosService,
      useValue: new AxiosService(new ConfigService()),
    },
  ],
  exports: [AxiosService],
})
export class AxiosModule {}
