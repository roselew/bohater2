import { Component, OnInit, Renderer2} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from "../services/users.service";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'family-mailchange',
  template: `

  <app-header [simpleH1]="'Zmiana'" [skewH1]="'email'"></app-header> 

  <div class="title-container">
   
  <app-spinner *ngIf="showSpinner"></app-spinner>

    <form #formRef="ngForm" *ngIf="!showSpinner" (submit)="login()">

    <!--  <span *ngIf="(email.touched || email.dirty) && email.invalid">
        <p>nie podałeś email</p>
      </span> -->

      <input type='text' placeholder='Email' [(ngModel)]="oldMail" name="oldemail" #oldemail="ngModel" required>

      <input type='text' placeholder='Nowy adres Email' [(ngModel)]="newMail" name="newemail" #newemail="ngModel" required>

        <!-- <span > 
          <small *ngIf="formRef.controls.email?.errors?.required" class="form-text text-muted">Field is required</small>
          <small *ngIf="formRef.controls.email?.errors?.email" class="form-text text-muted">Invalid email format</small>
        </span> -->

      <input type='password' placeholder='Hasło' [(ngModel)]="parent['password']" name="password">
      


      <button type='submit'>ZALOGUJ</button>

    </form>

    
    <a [routerLink]="['/witaj']">
       <div class="back">←</div>
    </a>

  </div>


  `,
  styles: [],

})
export class FamilyMailchangeComponent implements OnInit {

 


 
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
      .then ( () => {
        this.users.resetUserEmail(this.newMail)  
            .then( ()=> {this.showSpinner = false} )
            .catch( error=> console.log(error.message))
      })
    }

  parents
  ngOnInit() {
    this.oldMail = this.users.currentUserEmail;
    this.parent['email']=this.oldMail;
  }

  newMail
  oldMail
  parent={}
 

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'kid');
    this.renderer.removeClass(document.body, 'title-page');
  }
}
