import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class MenuItemPipe implements PipeTransform {
  transform(value: any) {
    return this.constructSearchQuery(value);
  }

  constructSearchQuery(queryParams: any) {
    const constructedQuery: any = {};

    if (queryParams.menuItems?.name) {
      constructedQuery['MenuItem.name'] = queryParams.menuItems.name;
    }

    if (queryParams.menuItems?.price) {
      constructedQuery['MenuItem.price'] = queryParams.menuItems.price;
    }

    return constructedQuery;
  }
}
