import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'fechaPermisoTransform'
})
export class FechaPermisoTransformPipe implements PipeTransform {

  transform(dates: Date[] | undefined): string {

    if (dates === undefined) return '';

    let cadena: string = ``;
    if (dates[0])
      cadena += `${ dates[1] ? 'Del': '' } ${ moment(dates[0]).locale('es').format(  dates[1] ? 'DD [DE] MMMM [DE] YYYY' : 'dddd, DD [DE] MMMM [DE] YYYY') }`;
    if (dates[1])
      cadena += ` al ${ moment(dates[1]).locale('es').format('DD [DE] MMMM [DE] YYYY') }`;

    return cadena;

  }

}
