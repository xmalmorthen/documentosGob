import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class TokenExistGuard implements CanActivate {

  constructor(
    private _Router: Router,
    private _DataService: DataService
    ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    const token: string | null = this._DataService.getToken;
    if (!token)
      this._Router.navigate(['/identificarse']);

    return token ? true : false;

  }
  
}
