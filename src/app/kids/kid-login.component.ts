import { Component, OnInit, Renderer2} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from "../services/users.service";

@Component({
  selector: 'kid-login',
  template: `

  
  <app-header [simpleH1]="'Dziecko'" [skewH1]="'Logowanie'"></app-header> 
  
  <div class="title-container">
  
    <div class="code-box">
    <label *ngFor="let code of codes">
      <input type="checkbox"
              value="{{code.value}}"
              [(ngModel)]="code.checked"
              name="code.name"
      >
      <span>★</span>    
    </label>     
  </div>

  <a [routerLink]="['/rodzina']">
    <div class="back">↩</div>
  </a>

  <button (click)="login()">ZALOGUJ</button>

   </div>



  `,
  styles: [],

})
export class KidLoginComponent implements OnInit {

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

  constructor(
    public users: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2) { 
      this.renderer.addClass(document.body,'kid')
      this.renderer.addClass(document.body,'title-page')
    }

  kid={}

  showSpinner: boolean = false

  login() {
    this.showSpinner = true
    this.users.currentKid = this.kidLogin
    this.router.navigate(['rodzina/dziecko/'+this.kidLogin])
  }

  kidLogin
  ngOnInit() {
    this.kidLogin = this.users.toLogUser
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'kid');
    this.renderer.removeClass(document.body, 'title-page');
  }
}
