import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
@Injectable()
export class FilterPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value['password']) delete value['password'];
    else if (value['reEntredPassword']) delete value['reEntredPassword'];

    return value;
  }
}
