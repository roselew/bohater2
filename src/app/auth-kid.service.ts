import { Injectable } from '@angular/core';

@Injectable()
export class AuthKidService implements CanActivate  {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('loggedKid')) {return true} else {return false}
  }
  
}
