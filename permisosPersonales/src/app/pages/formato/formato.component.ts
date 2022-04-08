import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormInterface } from '../../interfaces/form.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { interval, Subscription } from 'rxjs';
import { take} from 'rxjs/operators';
import * as moment from 'moment';

// INTERFACES
import * as tokenInInterface from '../../interfaces/token.interface';
import * as issuingInInterface from '../../interfaces/issuing.interface';
import { keyValueCatalogInterface } from '../../interfaces/catalog.interface';
import { formatoModelInterface } from '../../interfaces/formato.interface';

// SERVICES
import { StampService } from '../../services/stamp.service';
import { DataService } from '../../services/data.service';
import { TokenService } from '../../services/token.service';
import { CatalogsService } from '../../services/catalogs.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

declare const $: any;

@Component({
  selector: 'app-formato',
  templateUrl: './formato.component.html',
  styleUrls: ['./formato.component.scss'],
  providers: [
    MessageService
  ]
})
export class FormatoComponent implements OnInit, OnDestroy, AfterViewInit {

  private subs$: Subscription[] = [];

  public formModule: ReactiveFormInterface;
  public frmgp: FormGroup;
  public dataModel: tokenInInterface.APIResponse.Response | null = null;
  public issuingModel: issuingInInterface.APIResponse.Response | null= null;

  public tipoPermisos: keyValueCatalogInterface[] = [];

  public especifiqueMaxLength: number = 65;
  public motivoMaxLength: number = 180;
  public especifiqueSectionShow: boolean = false;
  public horarioJistificacionSectionShow: boolean = true;

  public disabledDates: Date[] = [];

  public fromHour: Date | null | undefined = undefined;
  public toHour: Date | null | undefined = undefined;
  public fechaPermisoCantidadDias: number = 0;
  public cantidadHoras: number = 0;

  public showPreview: boolean = false;

  public formatoModel: formatoModelInterface | null = null;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService, 
    private primengConfig: PrimeNGConfig,
    public _StampService: StampService,
    private _DataService: DataService,
    private _TokenService: TokenService,
    private _CatalogsService: CatalogsService,
    private _Router: Router,
  ) { 

    this.primengConfig.ripple = true;

    this.formModule =  {
      formSubmitted: false,
      withErr: false
    };

    this.frmgp = this.fb.group({
      fechaElaboracion: [ new Date(), [ Validators.required ]],
      tipoPermiso: [ null, [ Validators.required ]],
      especifique: [ '', [ Validators.maxLength( this.especifiqueMaxLength ) ]],
      fechaPermiso: [ [ new Date(), null ], [ Validators.required ]],
      horario: [ [], []],
      motivo: [ '', [ Validators.required, Validators.maxLength( this.motivoMaxLength ) ] ],
    });

  }

  ngOnInit(): void {
    
    this.init();
    
    if (!this.dataModel)
      this.getDataToken();

    this.subs$.push(
      this.f.tipoPermiso.valueChanges.subscribe( data => this.tipoPermisoSubscription(data)),
      this.f.fechaPermiso.valueChanges.subscribe( data => this.fechaPermisoSubscription(data)),
    );
    
  }

  ngAfterViewInit(): void {
    this.eventsHandlers();    
  }

  ngOnDestroy(): void {
    this.subs$.forEach( item => item?.unsubscribe() );
  }

  private init(){

    this.getTipoPermisosCatalog();
    this.getDisabledDates();
    this.setDefaultHours();

  }

  private eventsHandlers(){

    const _this = this;
    $('#fromCalendar input').on('blur', function(this: any){
      try {
        _this.fromHour = _this.parseTimes($(this).val()).locale('es').toDate();
        _this.f.horario.setErrors({});
      } catch (error) {
        _this.fromHour = null;
      }
    });

    $('#toCalendar input').on('blur', function(this: any){
      try {
        _this.toHour = _this.parseTimes($(this).val()).locale('es').toDate();
        _this.f.horario.setErrors({});
      } catch (error) {
        _this.toHour = null;        
      }
    });

  }

  private setDefaultHours(){
    this.fromHour = moment().locale('es').seconds(0).toDate();
    this.toHour = moment().locale('es').seconds(0).add(3,'hours').toDate();
    this.fromToHoursChange();
  }

  private getTipoPermisosCatalog(){

    this._CatalogsService.tipoPermisos().then( (data:keyValueCatalogInterface[]) => {
      this.tipoPermisos = data;
    }).catch ( (err) => {
      this.tipoPermisos = [];
    }).then( ()=>{

      if (this.tipoPermisos.length)
        this.f.tipoPermiso.setValue(  this.tipoPermisos[0] );

    });

  }

  private getDisabledDates(){

    this._CatalogsService.disabledDates().then( (data:Date[]) => {
      this.disabledDates = data;
    }).catch ( (err) => {
      this.disabledDates = [];
    });

  }

  private tipoPermisoSubscription( value: keyValueCatalogInterface ){
    
    this.especifiqueSectionShow = value.value.toString().toLowerCase().includes('otro');
    if (this.especifiqueSectionShow)
      interval(0).pipe(take(1)).subscribe( () => $('.especifiqueTextArea').focus());

  }

  private fechaPermisoSubscription(value: Date[]){

    this.fechaPermisoCalcularCantidadDias(value);
    this.fechaPermisoCheckRange(value);
  } 

  private fechaPermisoCalcularCantidadDias( value: Date[] ){
    
    this.fechaPermisoCantidadDias = 0;
    if (!value[0] || !value[1]) return;

    const dateArray: moment.Moment[] = [];
    const startDate = moment( value[0] ).locale('es');
    const stopDate = moment( value[1] ).locale('es');

    while (startDate <= stopDate) {

      if (
        ![0,6].includes(startDate.day()) 
        && !this.isDisabledDate( startDate.toDate() )
      )
        dateArray.push(startDate);

      startDate.add(1,'days').locale('es');
    }

    this.fechaPermisoCantidadDias = dateArray.length;

  }

  private fechaPermisoCheckRange( value: Date[] ){
    
    
    if (value[0] && value[1]){
      
      if (value[0].toUTCString() == value[1].toUTCString()) {
        this.f.fechaPermiso.setValue([ value[0] ]);
        this.horarioJistificacionSectionShow = true;
      } else {
        this.horarioJistificacionSectionShow = false;
      }

    } else {

      this.horarioJistificacionSectionShow = true;

    }

  }

  private isDisabledDate(date: Date){
    return this.disabledDates.find( qry => qry.toUTCString() === date.toUTCString() ) ? true : false;
  }
  
  private getDataToken(){

    
    this._StampService.dataToken( <string>this._DataService.getToken ).then( async (model: tokenInInterface.APIResponse.RootObject) => {
      
      if (+model.RESTService.StatusCode == 0){

        await this._TokenService.RegenerateEmployeeToken();
        return this.getDataToken();

      }

      this.dataModel = model.Response;
      
      this.getIssuingData(model.Response.RFCEmisor);

    });
  }

  private async getIssuingData(rfc: string): Promise<void> {
    try {
      this.issuingModel = await this._StampService.issuingData(rfc);
    } catch (error) {
      this.issuingModel = null;
    }
    
  }
  
  public async onSubmit(){
    this.formModule.withErr = false;
    this.formModule.formSubmitted = true;
    
    this.messageService.clear();

    try {

      this.populateNgModels();

      this.formValidations();

      this.formRestrictions();

      if (this.frmgp.valid) {

        this.formatoModel = this.formatoModelPopulate();

        console.log(this.formatoModel);
        
        this.showPreview = true;

      } else
        throw new Error('Falta información');
        
    } catch (err: any) {

      interval(0).pipe(take(1)).subscribe( () => {
        this.messageService.add({severity:'error', summary:'Error', detail:'Falta información o no es correcta, favor de revisar'});
      });

    }

    return false;

  }

  private populateNgModels(){

    const fromToHours: (Date | string | null)[]  = [];
    
    fromToHours.push(this.fromHour || null);
    fromToHours.push(this.toHour || null);

    this.f.horario.setValue( fromToHours );

  }

  private formValidations(){

    // SI EL TEXTAREA PARA ESPECIFICAR EL TIPO DE PERMISO ESTÁ VISIBLE Y VACÍO
    if (this.especifiqueSectionShow && !this.f.especifique.value.toString())
      this.f.especifique.setErrors({ 'required': true });

    const horario: (Date | string | null)[] = this.f.horario.value;
    const fechaPermiso: (Date | null)[] = this.f.fechaPermiso.value;
    
    if (!fechaPermiso[1] && ( !horario[0] && !horario[1] ))
      this.f.horario.setErrors({ 'required': true });
    else {

      if (!horario[0] && !$('#fromCalendar input').val())
        this.f.horario.setErrors({ 'fromRequired': true });
      else if (!horario[0] && $('#fromCalendar input').val())
        this.f.horario.setErrors({ 'fromFormat': true });
      
      if (!fechaPermiso[1] && !horario[1] && !$('#toCalendar input').val() )
        this.f.horario.setErrors({ 'toRequired': true });
      else if (!fechaPermiso[1] && !horario[1] && $('#toCalendar input').val() )
        this.f.horario.setErrors({ 'toFormat': true });

    }

  }

  private formRestrictions(){

    const horario: (Date | string | null)[] = this.f.horario.value;

    if ( horario[1] ){
      const hr1: moment.Moment = moment(horario[0]),
      hr2: moment.Moment = moment(horario[1]);

      if ( hr2.diff(hr1,'seconds') + 1 <= 59)
        this.f.horario.setErrors({ 'rangeErr': true });
      else if ( hr2.diff(hr1,'minutes') + 1 < 30)
        this.f.horario.setErrors({ 'range30min': true });

    }

  }

  private formatoModelPopulate(): formatoModelInterface {

    return {
      dataToken: <tokenInInterface.APIResponse.Response>this.dataModel,
      emisorData: <issuingInInterface.APIResponse.Response>this.issuingModel,
      formulario: {
        fechaElaboracion: this.f.fechaElaboracion.value,
        tipoPermiso: this.f.tipoPermiso.value,
        especifique: this.f.especifique.value,
        fechaPermiso: this.f.fechaPermiso.value,
        horario: this.f.fechaPermiso.value[1] ? [] : this.f.horario.value,
        motivo: this.f.motivo.value,
        dias: this.fechaPermisoCantidadDias,
        horas: this.f.fechaPermiso.value[1] ? 0 : this.cantidadHoras
      }
    }

  }

  private parseTimes(time: string | Date): moment.Moment{
    
    let timeParsed: moment.Moment;
    timeParsed = moment(time).locale('es');

    if (!timeParsed.isValid()) {
      
      const formats: string[] = [
        'hh:mm a',
        'HH:mm',
      ];
      let iter: number = 0;

      do {
        timeParsed = moment(time, formats[iter]).locale('es');    
        if (timeParsed.isValid()) break;
        iter++;
      } while ( iter < formats.length );
      
      if (!timeParsed.isValid())
        throw new Error("Formato de fecha inválida");

    }
      
    return timeParsed;

  }

  public get f() {
    return this.frmgp.controls
  }

  public fromToHoursChange(){
    
    const valuesFromNgModel: (Date | null | undefined)[] = [
      this.fromHour,
      this.toHour
    ]

    const valuesFromDomElements: string[] = [
      $('#fromCalendar input').val(),
      $('#toCalendar input').val(),
    ];

    if (
        (!valuesFromNgModel[0] 
        || !valuesFromNgModel[1])
        &&
        (!valuesFromDomElements[0]
        || !valuesFromDomElements[1])

    ) return;

    let from: moment.Moment | null = null;
    let to: moment.Moment | null = null;

    try {
      from = this.parseTimes(valuesFromNgModel[0] ? valuesFromNgModel[0] : valuesFromDomElements[0]).locale('es');
    } catch (error) {
      this.f.horario.setErrors({ 'fromFormat': true });
    }

    try {
      to = this.parseTimes(valuesFromNgModel[1] ? valuesFromNgModel[1] : valuesFromDomElements[1]).locale('es');
    } catch (error) {
      this.f.horario.setErrors({ 'toFormat': true });
    }

    if (to && from) {
      this.cantidadHoras = to.diff(from,'minutes');
    } else 
      this.cantidadHoras = 0;

  }

  public async gotoMain(){
    const swalResponse = await Swal.fire({
      title: "Favor de confirmar",
      html: "Se dirigirá al formulario de identificación",
      footer: "La información capturada se perderá",
      icon: 'question',
      showCancelButton: true,      
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      customClass: {
        confirmButton: 'btn btn-outline-success btn-lg m-1',
        cancelButton: 'btn btn-outline-danger btn-lg m-1 '
      },
      buttonsStyling: false,
      didOpen: () => {
        $('body').removeClass('swal2-height-auto');
      },
    })

    if (swalResponse.isConfirmed)
      this._Router.navigate( [ '/identificarse' ]);
  }
  

}
