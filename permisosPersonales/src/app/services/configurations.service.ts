import { Injectable } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

declare const $: any;

@Injectable({
  providedIn: 'root'
})
export class ConfigurationsService {

  constructor(
    private config: PrimeNGConfig,
  ) { 
    this.prineNgConfiguration();
    this.defaultsLoadingOverlay();
  }

  prineNgConfiguration(){
    this.config.setTranslation({
      dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
      dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
      dayNamesMin: [ "D","L","M","X","J","V","S" ],
      monthNames: [ "Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre" ],
      monthNamesShort: [ "Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic" ],
      today: 'Hoy',
      clear: 'Limpiar',
      weekHeader: "Sm",
      startsWith: "Comienza con",
      contains: "Contiene",
      notContains: "No contiene",
      endsWith: "Termina con",
      equals: "Igual",
      notEquals: "Distinto",
      noFilter: "Sin filtro",
      lt: "Menor que",
      lte: "Menor que o igual a",
      gt: "Mayor que",
      gte: "Mayor que o igual a",
      is: "Es",
      isNot: "No es",
      before: "Antes",
      after: "Después",
      dateIs: "La fecha es",
      dateIsNot: "La fecha no es",
      dateBefore: "La fecha es anterior",
      dateAfter: "La fecha es después",
      apply: "Aplicar",
      matchAll: "Coincide con todos",
      matchAny: "Coincide con cualquiera",
      addRule: "Agregar regla",
      removeRule: "Quitar regla",
      accept: "Si",
      reject: "No",
      choose: "Escoger",
      upload: "Subir",
      cancel: "Cancelar",
      weak: 'Débil',
      medium: 'Medio',
      strong: 'Fuerte',
      passwordPrompt: 'Ingresar contraseña',
      emptyMessage: 'No se encontraron resultados',
      emptyFilterMessage: 'No se encontraron resultados'
    });
  }

  defaultsLoadingOverlay(){

    $.LoadingOverlaySetup(
      {
          image: "",
          fontawesome: "fa fa-cog fa-spin",
          fontawesomeAutoResize: true,
          fontawesomeOrder: 1,
    
          text: '',
          textAutoResize: true,
          textResizeFactor: 1,
    
          direction: 'row',
          fade: [100, 100],
    
          zIndex: 9999998
      }
    );
  }

}
