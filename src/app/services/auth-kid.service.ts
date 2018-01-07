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
    state: RouterStateSnapshot): Observable<boolean> | boolean {
     return !!this.users.currentKid || this.auth.kid
      .take(1)
      .map(kid => !!kid)
      .do (loggedIn => {
        if (!loggedIn) {
          console.log('access denied')
          this.router.navigate(['/dziecko-logowanie']);
        } else {
          console.log('access granted')
        }
      })

  }
  
}
