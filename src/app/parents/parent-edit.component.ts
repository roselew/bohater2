import { Component, OnInit, Renderer2} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from "../services/users.service";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'parent-edit',
  template: `

  <app-header [simpleH1]="'Rodzina'" [skewH1]="'Edycja'"></app-header> 


  <div class="title-container">

  <app-spinner *ngIf="showSpinner"></app-spinner>
  
    <form *ngIf="!showSpinner && parent">

      <view-parent *ngIf="!showSpinner && parent" [codes]="codes" [parent]="parent"></view-parent>
  
      <button type='submit' (click)="addParent()">ZAPISZ ZMIANY</button>

      <button class="altButton">Zmień hasło dla całej rodziny</button>

      <button class="altButton">Zmień adres email</button>

      <button class="altButton">Zmień hasło rodzica</button>

    </form>

    <a [routerLink]="['/rodzina']">
      <div class="back">←</div>
    </a>

  </div>
  `,
  styles: [``],

})
export class ParentEditComponent implements OnInit {

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

  parent
  status

  ngOnInit() {
    this.users.getOneParent(this.users.currentUserEmail)
    .subscribe( parent => {
      this.parent = parent;
      for (let code of this.parent['code']) {
        this.codes.map(opt => {if (opt.value===code){opt.checked=true}})
      }
      this.status='ready'
    })
  }
  
  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'kid');
    this.renderer.removeClass(document.body, 'title-page');
  }

  checkpassword

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
  



