import { RESTService } from "./restRESPONSE.interface";

export module APIResponse {

    export interface RootObject {
        RESTService: RESTService;
        Response: Response[];
    }
    
    export interface Response {
        rfc: string,
        nombre: string,
    }

}
