import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GithubService } from './github.service';

@Controller('github')
export class GithubController {
  constructor(
    private readonly githubService: GithubService,
  ) {}

  @Get(':username/:reponame')
  getInfoRepo(
    @Param('username') username: string,
    @Param('reponame') reponame: string,
  ) {
    return this.githubService.getRepo(username, reponame);
  }

  @Get(':username/:reponame/commits')
  getCommits(
    @Param('username') username: string,
    @Param('reponame') reponame: string,
  ) {
    return this.githubService.getCommits(username, reponame);
  }
}
