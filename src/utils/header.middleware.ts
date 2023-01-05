import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class setHeader implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-With,content-type',
    );
    next();
  }
}
