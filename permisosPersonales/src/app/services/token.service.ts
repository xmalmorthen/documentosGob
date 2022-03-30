import { Injectable } from '@angular/core';

// INTERFACES
import * as logInInterface from '../interfaces/logIn.interface';

// SERVICES
import { StampService } from './stamp.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private _StampService: StampService,
    private _DataService: DataService,
  ) { }
      
  public async GenerateEmployeeToken (employeeData: logInInterface.APIRequest.reqModel): Promise<string> {    
    
    const tokenResponse: logInInterface.APIResponse.Response = this._validateResponseGetToken( await this._StampService.getToken( employeeData ) );
    this._DataService.storeToken = tokenResponse.JWT; 
    this._DataService.storeEmployeeData = employeeData;
    return tokenResponse.JWT;

  }

  public async RegenerateEmployeeToken(): Promise<string>{
    const employeeData: logInInterface.APIRequest.reqModel | null = this._DataService.getEmployeeData;

    if (!employeeData)
      throw new Error("No se encontró información del empleado(a)");

    return await this.GenerateEmployeeToken( employeeData );
  }

  private _validateResponseGetToken(model: logInInterface.APIResponse.RootObject): logInInterface.APIResponse.Response{
    if (+model.RESTService.StatusCode == 0){
      if (model.RESTService.Message.trim().toLowerCase().includes('sin información'))
        throw new Error(`No se encuentra o no coincide la información del empleado(a)`);
      else
        throw new Error(model.RESTService.Message);

    } 
    
    return model.Response;
  }




}
