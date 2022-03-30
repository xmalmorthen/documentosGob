import { AxiosError } from "axios";

declare const $: any;

export class utils {

    public static validateAxiosResponse(response: AxiosError){

        if (!response.response)
          return new Error( response.message );
          
        const { data } = response.response;
        if (!data)
          return new Error( response.message );
    
        if (!data.RESTService)
          return new Error( response.message );
        else    
          return new Error( `${data.RESTService.Message} | UUID de Seguimiento [ ${data.RESTService.ResponseKey} ]` );
    
    }

    public static delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
    }

    public static loader(show: boolean, ele: any = null): void {

      const status: string = show ? 'show' : 'hide';
  
      if (!ele)
        $.LoadingOverlay(status, true);
      else
        $(ele).LoadingOverlay(status, true);
  
    }

    public static getBase64ImageFromURL(url: string): Promise<string> {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.setAttribute("crossOrigin", "anonymous");
      
        img.onload = () => {
          const canvas: HTMLCanvasElement = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
      
          const ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D>canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
      
          const dataURL: string = canvas.toDataURL("image/png");
          resolve(dataURL);

        };
      
        img.onerror = error => {
          reject(error);
        };
      
        img.src = url;

      });
    }

}