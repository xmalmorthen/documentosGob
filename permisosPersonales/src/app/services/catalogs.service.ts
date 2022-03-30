import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// INTERFACE
import { keyValueCatalogInterface } from '../interfaces/catalog.interface';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CatalogsService {

  constructor(
    private _HttpClient: HttpClient
  ) { }

  public async tipoPermisos (id: number | null = null): Promise<keyValueCatalogInterface[]> {

    return this._HttpClient.get<keyValueCatalogInterface[]>('assets/statics/tipoPermisos.js')
    .toPromise()
    .then(res => <keyValueCatalogInterface[]>res)
    .then(data => { return data; });

  }

  public async disabledDates (): Promise<Date[]> {

    return this._HttpClient.get<string[]>('assets/statics/disabledDates.js')
    .pipe(

      map<string[],Date[]>( data => {
        return data.map( item => moment(item,'DD/MM/YYYY').toDate());
      })

    )
    .toPromise();

  }

  



}
