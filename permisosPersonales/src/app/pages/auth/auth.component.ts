import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { interval, Subscription } from 'rxjs';
import { take} from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

// INTERFACES
import * as logInInterface from '../../interfaces/logIn.interface';
import { ReactiveFormInterface } from 'src/app/interfaces/form.interface';

// SERVICES
import { StampService } from '../../services/stamp.service';
import { DataService } from '../../services/data.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [
    MessageService
  ]
})
export class AuthComponent implements OnInit, OnDestroy {

  private subs$: Subscription[] = [];

  public formModule: ReactiveFormInterface;

  public frmgp: FormGroup;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService, 
    private primengConfig: PrimeNGConfig,
    private _StampService: StampService,
    private _DataService: DataService,
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute,
    private _TokenService: TokenService
  ) { 

    this.primengConfig.ripple = true;

    this.formModule =  {
      formSubmitted: false,
      withErr: false
    };

    this.frmgp = this.fb.group({
      curpRfc: [ null, [ Validators.required, Validators.minLength(13), Validators.maxLength(18)]],
      noCtrl: [ null, [ Validators.required, Validators.minLength(4), Validators.maxLength(5)]],
      remember: [ false, [] ],
    });
    
  }

  ngOnInit(): void {

    this._DataService.removeToken();
    this.getFromRemember();

    this.subs$.push(
      this._ActivatedRoute.queryParams
        .subscribe(params => {
          
          if (params.err)
          this.showQueryParamErr( atob(params.err));

        }
      )
    );

  }

  ngOnDestroy(): void {
    this.subs$.forEach( item => item?.unsubscribe() );
  }

  get f(){
    return this.frmgp.controls;
  }

  getFromRemember(){

    const rememberData = this._DataService.getRemember;
    if (!rememberData) return;

    this.f.curpRfc.setValue( rememberData.curpRfc );
    this.f.noCtrl.setValue( rememberData.noCtrl );
    this.f.remember.setValue ( true );


  }

  async onSubmit(){
    this.formModule.withErr = false;
    this.formModule.formSubmitted = true;
    this.formModule.formSubmitting = true;
    
    this.messageService.clear();

    try {

      if (this.frmgp.valid) {

        this.frmgp.disable();

        await this._TokenService.GenerateEmployeeToken( { ...this.makeLoginReqModel } );

        this._Router.navigate(['/']);

        this.storeRemember();

        return;

      } else
        throw new Error('Falta información o no es correcta, favor de revisar');
        
    } catch (err: any) {

      this.frmgp.enable();

      this.formModule.withErr = true;

      interval(0).pipe(take(1)).subscribe( () => {
        this.messageService.add({severity:'error', summary:'Error', detail: err.message});
      });

    }

    this.formModule.formSubmitting = false;

    return false;

  }  

  private get makeLoginReqModel(): logInInterface.APIRequest.reqModel {

    const model: logInInterface.APIRequest.reqModel = {
      noCtrl: this.f.noCtrl.value
    };

    if ( this.f.curpRfc.value.toString().length == 18 )
      model.curp = this.f.curpRfc.value;
    else
      model.rfc =  this.f.curpRfc.value;

    return model;
  }
  
  private showQueryParamErr(err: string){
    this.formModule.withErr = true;
    interval(0).pipe(take(1)).subscribe( () => {
      this.messageService.add({severity:'error', summary:'Error', detail: err});
    });
  }

  private storeRemember(){
    if (this.f.remember.value == true)
      this._DataService.storeRemember = { ...this.frmgp.value };
    else 
      this._DataService.removeRemember();
  }

}
