
import { ConfigService } from './../../config/config.service';
import { Configuration } from './../../config/config.keys';
import axios, { AxiosInstance } from 'axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AxiosService {
  private GithubApi: string;
  private CreateApiInstance: AxiosInstance = axios.create();
  private readonly httpService: HttpService;

  constructor(private readonly _config: ConfigService) {
    this.GithubApi = _config.get(Configuration.GITHUB_API);
    this.refreshGithubInstance();
  }

  public refreshGithubInstance() {
    this.CreateApiInstance = axios.create({
      baseURL: this.GithubApi,
    });
  }

  async getRepo(username, reponame) {
    try {
      const response = await axios.get(`/repos/${username}/${reponame}`);
      if (!response.data) return;
      return response.data;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async getCommits(username, reponame) {
    const { data } = await firstValueFrom(
      this.httpService.get(`/repos/${username}/${reponame}/commits`).pipe(
        catchError((error) => {
          throw new BadRequestException(`${error} An error happened!`);
        }),
      ),
    );
    return data;
  }
}
