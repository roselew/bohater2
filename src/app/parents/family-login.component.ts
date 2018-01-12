import { Component, OnInit, Renderer2} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from "../services/users.service";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'family-login',
  template: `

  <app-header [simpleH1]="'Rodzina'" [skewH1]="'Logowanie'"></app-header> 

  <!--<div *ngIf="afAuth.authState | async; let user; else showLogin">
  <h1>Hello {{ user.email }}!</h1>

  <button (click)="logout()">Logout</button>
</div> 
<ng-template #showLogin>
  <p>Please login.</p>
</ng-template>-->

  <div class="title-container">
   
  <app-spinner *ngIf="showSpinner"></app-spinner>

    <form #formRef="ngForm" *ngIf="!showSpinner" (submit)="login()">

      <input type='text' placeholder='Email' [(ngModel)]="parent['email']" name="email">
        <!-- <span *ngIf="formRef.controls.email?.touched  || formRef.controls.email?.dirty"> 
          <small *ngIf="formRef.controls.email?.errors?.required" class="form-text text-muted">Field is required</small>
          <small *ngIf="formRef.controls.email?.errors?.email" class="form-text text-muted">Invalid email format</small>
        </span> -->

      <input type='password' placeholder='Hasło' [(ngModel)]="parent['password']" name="password">

      <input type='checkbox' name='remember'>
      <label for='checkbox'>Zapamiętaj mnie</label>

      <button type='submit'>ZALOGUJ</button>

    </form>
    <a routerLink='/rodzic-rejestracja'>Nie masz konta? Zarejestruj się</a>
  
  </div>


  `,
  styles: [],

})
export class FamilyLoginComponent implements OnInit {

 parent ={}
 
 showSpinner: boolean = false

//     login(form) {
//     if(form.invalid){
//       return;
//     }
//       console.log('udalo sie')
// //     localStorage.clear()
// //     localStorage.setItem('loggedParent',parentId)  
// //     this.router.navigate(['/rodzic'])  
//   }
  

  constructor(
    public afAuth: AngularFireAuth,
    public users: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2) { 
      this.renderer.addClass(document.body,'kid')
      this.renderer.addClass(document.body,'title-page')
    }

    login() {
      this.showSpinner = true
      this.users.parentLogin(this.parent)
      .then ( () => this.showSpinner = false)
    }

  parents
  ngOnInit() {}


  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'kid');
    this.renderer.removeClass(document.body, 'title-page');
  }
}
