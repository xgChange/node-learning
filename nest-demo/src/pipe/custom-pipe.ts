/**
 * @description 自定义的管道
 */

import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    // console.log(Object.toString.call(metatype), metatype);
    return (metatype as any)(value);
  }
}
