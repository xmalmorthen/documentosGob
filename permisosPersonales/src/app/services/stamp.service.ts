import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from "axios";

// CLASES
import { utils } from '../classes/utils.class';

// INTERFACES
import * as logInInterface from '../interfaces/logIn.interface';
import * as tokenInInterface from '../interfaces/token.interface';
import * as issuingInInterface from '../interfaces/issuing.interface';

enum METHODS_ENUM {
  LogIn = 'Formatos/LogIn',
  DataToken = 'Formatos/DataToken',
  Issuing = 'Formatos/Emisor'
}

@Injectable({
  providedIn: 'root'
})
export class StampService {

  private stampingAPIEP: string;

  constructor(

  ) { 
    this.stampingAPIEP = `${environment.apis.stampingAPI.uri}/${environment.apis.stampingAPI.prefix}/`;
  }

  async getToken( model: logInInterface.APIRequest.reqModel ): Promise<logInInterface.APIResponse.RootObject> {

    const ep = `${ this.stampingAPIEP }${METHODS_ENUM.LogIn}`;
    try {
      
      const axiosResponse: AxiosResponse< logInInterface.APIResponse.RootObject > = await axios.post(ep, model);
      return axiosResponse.data;

    } catch (err: any) {

      throw utils.validateAxiosResponse(err);

    }

  }

  async dataToken(token: string): Promise<tokenInInterface.APIResponse.RootObject>{

    const ep = `${ this.stampingAPIEP }${METHODS_ENUM.DataToken}?token=${token}`;
    try {
      
      const axiosResponse: AxiosResponse< tokenInInterface.APIResponse.RootObject > = await axios.get(ep);
      return axiosResponse.data;

    } catch (err: any) {

      throw utils.validateAxiosResponse(err);

    }

  }

  async issuingData(rfc: string): Promise<issuingInInterface.APIResponse.Response> {

    const ep = `${ this.stampingAPIEP }${METHODS_ENUM.Issuing}/${rfc}`;
    try {
      
      const axiosResponse: AxiosResponse< issuingInInterface.APIResponse.RootObject > = await axios.get(ep);
      return axiosResponse.data.Response[0];

    } catch (err: any) {

      throw utils.validateAxiosResponse(err);

    }

  }

}
