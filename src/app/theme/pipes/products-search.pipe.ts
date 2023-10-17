import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ProductSearchPipe', pure: false })
export class ProductSearchPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    let searchText = new RegExp(args, 'ig');
    if (value) {
      return value.filter(product => {
        if (product.name) {
          return product.name.search(searchText) !== -1;
        }
        else{
          return product.username.search(searchText) !== -1;
        }
      });
    }
  }
}
