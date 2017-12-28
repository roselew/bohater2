import { Component, OnInit, Renderer2} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from "../services/users.service";

@Component({
  selector: 'kid-login',
  template: `

  
  <app-header [simpleH1]="'Dziecko'" [skewH1]="'Logowanie'"></app-header> 
  
  <div class="title-container">
  
   <form #formRef="ngForm" (submit)="login()">

     <input type='text' placeholder='Email' [(ngModel)]="kid['login']" name="login">

     <input type='password' placeholder='Hasło' [(ngModel)]="kid['password']" name="password">

     <input type='checkbox' name='remember'>

     <label for='checkbox'>Zapamiętaj mnie</label>

     <button type='submit'>ZALOGUJ</button>

   </form>

   </div>



  `,
  styles: [],

})
export class KidLoginComponent implements OnInit {

  constructor(
    public users: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2) { 
      this.renderer.addClass(document.body,'kid')
      this.renderer.addClass(document.body,'title-page')
    }

  kid={}

  login() {
    this.users.kidLogin(this.kid)
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'kid');
    this.renderer.removeClass(document.body, 'title-page');
  }
}
