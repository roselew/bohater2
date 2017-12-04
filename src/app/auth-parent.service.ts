import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthParentService implements CanActivate  {
  
  constructor(
    private router: Router
  ){}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('loggedParent')) {
      return true
    } else {
      this.router.navigate(['/rodzic-logowanie']);
      return false
    }
  }
  
}
