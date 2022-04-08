import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'horasTransform'
})
export class HorasTransformPipe implements PipeTransform {

  transform(value: number | undefined, truncOutput: boolean = false): string {
    
    if (value == undefined || !value) return '-';
        
    const hours = Math.floor(value / 60 ) % 60,
          minutes = value - (hours * 60);

    let msg = ``;
    if (hours > 0)
      msg += `${hours} ${ !truncOutput ? `hora` : 'hr' }${ hours > 1 ? 's' : ''}`;
    if (minutes > 0)
      msg += ` ${minutes} ${ !truncOutput ? `minuto` : `min`}${ minutes > 1 ? 's' : ''}`;

    return msg.trim();
  }

  

}
