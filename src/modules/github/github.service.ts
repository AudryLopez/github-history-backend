import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosService } from 'src/utils/axios/axios.service';
import { ConfigService } from 'src/config/config.service';
import { Configuration } from 'src/config/config.keys';

@Injectable()
export class GithubService {
  private GithubApi: string;
  constructor(
    private readonly httpService: HttpService,
    private readonly axiosService: AxiosService,
    private readonly _config: ConfigService,
  ) {
    this.GithubApi = _config.get(Configuration.GITHUB_API);
  }
  async getRepo(username, reponame) {
    const { data } = await firstValueFrom(
      this.httpService
        .get(`${this.GithubApi}/repos/${username}/${reponame}/commits`)
        .pipe(
          catchError((error) => {
            throw new BadRequestException(`${error} An error happened!`);
          }),
        ),
    );
    return data;
  }

  async getCommits(username, reponame) {
    const { data } = await firstValueFrom(
      this.httpService
        .get(`${this.GithubApi}/repos/${username}/${reponame}/commits`)
        .pipe(
          catchError((error) => {
            throw new BadRequestException(`${error} An error happened!`);
          }),
        ),
    );
    return data;
  }
}
