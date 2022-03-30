import * as tokenInInterface from "./token.interface";
import * as issuingInInterface from "./issuing.interface";
import { keyValueCatalogInterface } from './catalog.interface';

export interface formatoModelInterface {
    dataToken: tokenInInterface.APIResponse.Response,
    emisorData: issuingInInterface.APIResponse.Response,
    formulario: formularioInterface
}

export interface formularioInterface{

    fechaElaboracion: Date,
    tipoPermiso: keyValueCatalogInterface,
    especifique: string,
    fechaPermiso: Date[],
    horario: Date[]
    motivo: string,
    dias: number,
    horas: number,

}