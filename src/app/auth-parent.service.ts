import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UsersService } from './session/users.service';

@Injectable()
export class AuthParentService implements CanActivate  {
  
  constructor(
    private users: UsersService,
    private router: Router
  ){}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.users.getLoggedUser('parent')) {
      return true
    } else {
      this.router.navigate(['/rodzic-logowanie']);
      return false
    }
  }
  
}
