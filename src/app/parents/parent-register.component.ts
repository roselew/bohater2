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
  
    <form action='rodzic_login.html' *ngIf="!showSpinner">
    
      <input type='text' placeholder='E-mail' [(ngModel)]="parent['email']" name="email">

      <input type='password' placeholder='Hasło' [(ngModel)]="parent['password']" name="password">

      <input type='password' placeholder='Powtórz Hasło' [(ngModel)]="checkpassword" name="checkpassword">

      <input type="radio" [(ngModel)]="parent['gender']" value="M" name="parent-name" id="parent-left"><label for="parent-left" class="double">Jestem Tatą</label>
      <input type="radio" [(ngModel)]="parent['gender']" value="F" name="parent-name" id="parent-right"><label for="parent-right" class="double">Jestem Mamą</label>

      <button type='submit' (click)="addParent()">ZAREJESTRUJ</button>

    </form>

  </div>
  `,
  styles: [],

})
export class ParentRegisterComponent implements OnInit {

  constructor(
    private users: UsersService,
    private router: Router,
    private route:ActivatedRoute,
    private renderer: Renderer2) { 
      this.renderer.addClass(document.body,'parent')
      this.renderer.addClass(document.body,'title-page')
    }

  ngOnInit() {
  }
  
  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'parent');
    this.renderer.removeClass(document.body, 'title-page');
  }

  checkpassword
  parent ={}
  showSpinner: boolean = false

  addParent(){
     if (this.parent['password']===this.checkpassword){
        this.showSpinner = true
        this.users.parentRegister(this.parent)
        .then ( () => this.showSpinner = false)
      } else {
        alert('Hasło się nie zgadza')
      }
  } 

  }
  



