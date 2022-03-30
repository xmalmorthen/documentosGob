import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

// INTERFACES
import * as logInInterface from '../interfaces/logIn.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  public set storeToken(token:string){
    localStorage.setItem( btoa(environment.storage.token), token );
  }

  public get getToken(): string | null {

    const token = localStorage.getItem( btoa(environment.storage.token) );

    if (token) 
      return token;

    return null;

  }

  public removeToken(): void{
    localStorage.removeItem( btoa(environment.storage.token) );
  }

  public set storeEmployeeData(model: logInInterface.APIRequest.reqModel){
    localStorage.setItem( btoa(environment.storage.employeeData), btoa ( JSON.stringify(  model ) ) );
  }

  public get getEmployeeData(): logInInterface.APIRequest.reqModel | null {

    const model = localStorage.getItem( btoa (environment.storage.employeeData) );

    if (model) 
      return JSON.parse( atob(model) );

    return null;

  }

  public removeEmployeeData(): void{
    localStorage.removeItem( btoa(environment.storage.employeeData) );
  }


  public set storeRemember(remember: { curpRfc: string, nCtrl: string } ){
    localStorage.setItem( btoa(environment.storage.remember), btoa( JSON.stringify(remember) ) );
  }

  public get getRemember(): { curpRfc: string, noCtrl: string } | null {
    const rememberStorage = localStorage.getItem( btoa(environment.storage.remember) );

    if (rememberStorage)
      try {
        return JSON.parse( atob( rememberStorage ) );
        
      } catch (error) {}
    
    return null;
    
  }

  public removeRemember(): void{
    localStorage.removeItem( btoa(environment.storage.remember) );
  }




}
