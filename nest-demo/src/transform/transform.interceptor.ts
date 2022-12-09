import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs';

export interface Response<T> {
  data: T;
  code: number;
  message: string;
}

export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map<T, Response<T>>((data) => ({
        data,
        code: 200,
        message: 'OK',
      })),
    );
  }
}
