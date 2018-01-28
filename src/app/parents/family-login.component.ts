import { Component, OnInit, Renderer2} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from "../services/users.service";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'family-login',
  template: `

  <app-header [simpleH1]="'Rodzina'" [skewH1]="'Logowanie'"></app-header> 

  <div class="title-container">
   
  <app-spinner *ngIf="showSpinner"></app-spinner>

    <form #formRef="ngForm" *ngIf="!showSpinner" (submit)="login()">

    <!--  <span *ngIf="(email.touched || email.dirty) && email.invalid">
        <p>nie podałeś email</p>
      </span> -->

      <input type='text' placeholder='Email' [(ngModel)]="parent['email']" name="email" #email="ngModel" required>

        <!-- <span > 
          <small *ngIf="formRef.controls.email?.errors?.required" class="form-text text-muted">Field is required</small>
          <small *ngIf="formRef.controls.email?.errors?.email" class="form-text text-muted">Invalid email format</small>
        </span> -->

      <input type='password' placeholder='Hasło' [(ngModel)]="parent['password']" name="password">
      
      <div class="remember">
      <label>
        <input type='checkbox' name='remember' checked>
        <span>X</span><p> Zapamiętaj mnie</p>
      </label>
      </div>

      <button type='submit'>ZALOGUJ</button>

    </form>

    <button *ngIf="!showSpinner" routerLink='/rodzina-rejestracja' class="altButton">Nie masz konta ?</button>
  
    <button *ngIf="!showSpinner" class="altButton">Nie pamiętasz hasła</button>

    
    <a [routerLink]="['/witaj']">
       <div class="back">←</div>
    </a>

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
  ngOnInit() {

  }


  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'kid');
    this.renderer.removeClass(document.body, 'title-page');
  }
}
