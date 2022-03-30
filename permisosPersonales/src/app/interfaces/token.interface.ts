import { RESTService } from "./restRESPONSE.interface";

export module APIResponse {

    export interface RootObject {
        RESTService: RESTService;
        Response: Response;
    }
    
    export interface Response {
        Persona: Persona,
        RFCEmisor: string,
        rfc: string,
        curp: string,
        noCtrl: string,
    }

    export interface Persona{
        primerApellido: string,
        segundoApellido: string,
        nombres: string,
    }

}

export module APIRequest {

    

}
