import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'horarioTransform'
})
export class HorarioTransformPipe implements PipeTransform {

  transform(value: Date[] | undefined): unknown {

    if (value === undefined || !value.length) return '-';

    return `Desde ${ moment(value[0]).locale('es').format('h:mm a') } hasta ${ moment(value[1]).locale('es').format('h:mm a') }`;
  }

}
