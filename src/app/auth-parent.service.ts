import { Injectable } from '@angular/core';

@Injectable()
export class AuthParentService implements CanActivate  {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('loggedParent')) {return true} else {return false}
  }
  
}
