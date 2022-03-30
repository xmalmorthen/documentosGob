import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

// SERVICES
import { StampService } from '../services/stamp.service';
import { utils } from '../classes/utils.class';


@Injectable({
  providedIn: 'root'
})
export class TokenValidGuard implements CanActivate {

  constructor(
    private _StampService: StampService,
    private _Router: Router,
    ) {
  }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    
      const token: string | null = localStorage.getItem( btoa(environment.storage.token) )

      utils.loader(true);

      if (token)
        try {

          await this._StampService.dataToken( token );
          
        } catch (error) {
          this._Router.navigate(['/identificarse']);
        }

      utils.loader(false);
    
      return true;
  }
  
}
