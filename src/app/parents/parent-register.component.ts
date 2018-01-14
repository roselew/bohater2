import { Component, OnInit, Renderer2} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from "../services/users.service";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'parent-register',
  template: `

  <app-header [simpleH1]="'Rodzic'" [skewH1]="'Rejestracja'"></app-header> 

  <div class="title-container">

  <app-spinner *ngIf="showSpinner"></app-spinner>
  
    <form *ngIf="!showSpinner">
    
      <input type='text' placeholder='E-mail' [(ngModel)]="parent['email']" name="email">

      <input type='password' placeholder='Hasło' [(ngModel)]="parent['password']" name="password">

      <input type='password' placeholder='Powtórz Hasło' [(ngModel)]="checkpassword" name="checkpassword">

      <div class="triple-radio">
        <input type="radio" [(ngModel)]="parent['gender']" value="tata" name="parent-name" id="parent-left"><label for="parent-left" class="triple">Tata</label>
        <input type="radio" [(ngModel)]="parent['gender']" value="mama" name="parent-name" id="parent-center"><label for="parent-center" class="triple">Mama</label>
        <input type="radio" [(ngModel)]="parent['gender']" value="rodzic" name="parent-name" id="parent-right"><label for="parent-right" class="triple">Rodzic</label>
      </div>     

      <div class="double-radio">
        <input type="radio" [(ngModel)]="parent['codeExist']" value="T" name="codeExist" id="code-left"><label for="code-left" class="double">Z hasłem</label>
        <input type="radio" [(ngModel)]="parent['codeExist']" value="F" name="codeExist" id="code-right"><label for="code-right" class="double">Bez hasła</label>
      </div>
      
      <div *ngIf="parent['codeExist'] == 'T'" class="code-box">
        <label *ngFor="let code of codes">
          <input type="checkbox"
                  value="{{code.value}}"
                  [(ngModel)]="code.checked"
                  name="code.name"
          >
          <span>★</span>    
        </label>     
      </div>

      <button type='submit' (click)="addParent()">ZAREJESTRUJ</button>

    </form>

    <a [routerLink]="['/rodzina']">
      <div class="back">↩</div>
    </a>

  </div>
  `,
  styles: [``],

})
export class ParentRegisterComponent implements OnInit {

  constructor(
    private users: UsersService,
    private router: Router,
    private route:ActivatedRoute,
    private renderer: Renderer2) { 
      this.renderer.addClass(document.body,'kid')
      this.renderer.addClass(document.body,'title-page')
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

  ngOnInit() {
  }
  
  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'kid');
    this.renderer.removeClass(document.body, 'title-page');
  }

  checkpassword
  parent ={}
  showSpinner: boolean = false

  addParent(){
     if (this.parent['password']===this.checkpassword){
        this.showSpinner = true;
        this.parent['code']=this.codes.filter(x => x.checked==true).map(x => x.value);
        this.users.parentRegister(this.parent)
        .then ( () => this.showSpinner = false)
      } else {
        alert('Hasło się nie zgadza')
      }
  } 

  }
  



