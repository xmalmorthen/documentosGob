import { RESTService } from "./restRESPONSE.interface";

export module APIResponse {

    export interface RootObject {
        RESTService: RESTService;
        Response: Response;
    }
    
    export interface Response {
        JWT: string;
    }

}

export module APIRequest {

    export interface reqModel {
        rfc?: string,
        curp?: string,
        noCtrl: string
    }

}
