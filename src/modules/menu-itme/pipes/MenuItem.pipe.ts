import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { QueryString } from 'src/types/QueryString';

@Injectable()
export class MenuItemPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return this.constructSearchQuery(value);
  }

  constructSearchQuery(queryParams: any) {
    let constructedQuery: any = {};

    if (queryParams.menuItems?.name) {
      constructedQuery['MenuItem.name'] = queryParams.menuItems.name;
    }

    if (queryParams.menuItems?.price) {
      constructedQuery['MenuItem.price'] = queryParams.menuItems.price;
    }

    return constructedQuery;
  }
}
