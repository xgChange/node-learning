/**
 * @description log 的拦截器
 */

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { tap, map } from 'rxjs';
import { ReportLogger } from './ReportLogger';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  constructor(private repoter?: ReportLogger) {
    this.repoter.setContext('logInterceptor-repoter');
  }

  intercept(context: ExecutionContext, next: CallHandler) {
    const http = context.switchToHttp();
    const request = http.getRequest<Request>();

    this.repoter.log('before....');
    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        this.repoter.log(
          `after... ${request.url} - ${request.method} ${Date.now() - now} ms`,
        );
      }),
    );
  }
}
