import { Component, OnInit, Renderer2} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from "../services/users.service";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'parent-login',
  template: `

  <app-header [simpleH1]="'Rodzic'" [skewH1]="'Logowanie'"></app-header> 

  <!--<div *ngIf="afAuth.authState | async; let user; else showLogin">
  <h1>Hello {{ user.email }}!</h1>

  <button (click)="logout()">Logout</button>
</div> 
<ng-template #showLogin>
  <p>Please login.</p>
</ng-template>-->

  <div class="title-container">
   
  <app-spinner *ngIf="showSpinner"></app-spinner>

      <div *ngIf="!showSpinner && parent" class="code-box">
        <label *ngFor="let code of codes">
          <input type="checkbox"
                  value="{{code.value}}"
                  [(ngModel)]="code.checked"
                  name="code.name"
                  (ngModelChange)="show()"
          >
          <span>★</span>    
        </label>     
    </div>

    <a [routerLink]="['/rodzina']">
      <div class="back">↩</div>
    </a>
  

  </div>


  `,
  styleUrls: [],

})
export class ParentLoginComponent implements OnInit {

 parent

 show () {
   let a1 = this.codes.filter(x => x.checked==true).map(x => x.value);
   let a2 = this.parent['code'];

   if (a1.length==a2.length && a1.every((v,i)=> v === a2[i])) {
      this.showSpinner = true
      this.users.currentParent = this.parent['email']
      this.router.navigate(['rodzina/rodzic'])
   }
 }
 codes=[
  {name: 'code1', value: 0, checked: false},
  {name: 'code2', value: 1, checked: false},
  {name: 'code3', value: 2, checked: false},
  {name: 'code4', value: 3, checked: false},
  {name: 'code5', value: 4, checked: false},
  {name: 'code6', value: 5, checked: false},
  {name: 'code7', value: 6, checked: false},
  {name: 'code8', value: 7, checked: false},
  {name: 'code9', value: 8, checked: false}
];

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
      this.renderer.addClass(document.body,'parent')
      this.renderer.addClass(document.body,'title-page')
    }


    login() {
      this.showSpinner = true
      this.users.parentLogin(this.parent)
      .then ( () => this.showSpinner = false)
    }

  ngOnInit() {
    this.users.getOneParent(this.users.currentUserEmail)
    .subscribe( parent => {
      this.parent = parent;
    })
    
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'parent');
    this.renderer.removeClass(document.body, 'title-page');
  }
}
