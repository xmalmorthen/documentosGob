import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'diasTransform'
})
export class DiasTransformPipe implements PipeTransform {

  transform(value: number | undefined): string {
    if (value != undefined && value > 0)
      return value.toString();

    return '-';
  }

}
