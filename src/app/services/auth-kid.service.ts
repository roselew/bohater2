import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthKidService implements CanActivate  {
  
  constructor(
    private auth: AuthService,
    private users: UsersService,
    private router: Router
  ){}
  
  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): boolean {
      if (!!this.users.currentKid||!!this.users.currentParent){
        console.log('access granted')
        return true
      } else {
        console.log('access denied')
        this.router.navigate(['/rodzina/dziecko-logowanie']);
      }

  }
  
}
