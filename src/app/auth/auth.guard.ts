import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthserviceService } from './authservice.service';
import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';

@Injectable({providedIn : 'root'})
export class AuthGuard implements CanActivate{

  constructor(private authser: AuthserviceService, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  :boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree>{
    return this.authser.user.pipe(
      map(user => {
        const isAuth = !!user;
        if(isAuth) { return true; }
        return this.router.createUrlTree(['\auth']);
      })
    );
  }
}
