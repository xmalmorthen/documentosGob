import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'horasTransform'
})
export class HorasTransformPipe implements PipeTransform {

  transform(value: number | undefined): string {
    
    if (value == undefined || !value) return '-';
    
    return value.toString();
  }

}
