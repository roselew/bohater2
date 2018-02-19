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

    <form #formRef="ngForm" *ngIf="!showSpinner" (submit)="login(formRef)">

      <span class="info info__alert" *ngIf="(email.touched || email.dirty) && email.invalid">
        Błędny adres email
      </span> 

      <input type='text' placeholder='Email' pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" [(ngModel)]="parent['email']" name="email" #email="ngModel" required>

      <span class="info info__alert" *ngIf="(password.touched || password.dirty) && password.invalid">
        Hasło musi mieć minimum 6 znaków
      </span> 

      <input type='password' placeholder='Hasło' pattern=".{6,}" [(ngModel)]="parent['password']" #password="ngModel" name="password" required>
      
      <div class="remember">
      <label>
        <input type='checkbox' name='remember' checked>
        <!--<span>X</span><p> Zapamiętaj mnie</p>-->
      </label>
      </div>

      <button *ngIf="formRef.valid" type='submit'>ZALOGUJ</button>

    </form>

    <button *ngIf="!showSpinner" routerLink='/rodzina-rejestracja' class="altButton">Nie masz konta ?</button>

    <button *ngIf="!showSpinner" class="altButton" (click)="changePassoword()">Nie pamiętasz hasła</button>

    
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

    login(form) {
      if(form.invalid){
        console.log('cos jest zle')
      } else {
        this.showSpinner = true
        this.users.parentLogin(this.parent)
        .then ( () => this.showSpinner = false)
      }
    }

  parents
  ngOnInit() {

  }

  changePassoword(){

    let email = this.parent['email'];
    if(email){
      this.users.resetPassword(email);
    }else{
      alert('wpisz adres email na który mamy wysłać hasło')
    }
  
  }


  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'kid');
    this.renderer.removeClass(document.body, 'title-page');
  }
}
