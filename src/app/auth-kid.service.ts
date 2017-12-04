import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthKidService implements CanActivate  {
  
  constructor(
    private router: Router
  ){}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('loggedKid')) {
      return true
    } else {
      this.router.navigate(['/dziecko-logowanie']);
      return false
    }
  }
  
}
