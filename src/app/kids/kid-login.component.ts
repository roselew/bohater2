import { Component, OnInit, Renderer2} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { KidsService } from "./kids.service";

@Component({
  selector: 'kid-login',
  template: `

  
  <app-header [simpleH1]="'Dziecko'" [skewH1]="'Logowanie'"></app-header> 
  
  <div class="title-container">
  
   <form>

     <input type='text' placeholder='Email' [(ngModel)]="kid['login']" name="login">

     <input type='password' placeholder='Hasło' [(ngModel)]="kid['password']" name="password">

     <input type='checkbox' name='remember'>

     <label for='checkbox'>Zapamiętaj mnie</label>

     <button type='submit'>ZALOGUJ</button>

   </form>

  <p> Logowanie tymczasowe, kliknij na dziecko żeby się zalogować </p>
  <ul>
    <li *ngFor="let kid of kids"
        (click)="logOn(kid.id)">
        {{kid.name}}
    </li>
  </ul>


  `,
  styles: [],

})
export class KidLoginComponent implements OnInit {

  logOn(kidId){
    localStorage.clear()
    localStorage.setItem('loggedKid',kidId) 
    this.router.navigate(['/dziecko'])   
  }

  constructor(
    private service: KidsService,
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2) { 
      this.renderer.addClass(document.body,'kid')
      this.renderer.addClass(document.body,'title-page')
    }

  kids

  kid={}

  ngOnInit() {
    this.service.fetchKids()
    .subscribe( kids => this.kids = kids )
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'kid');
    this.renderer.removeClass(document.body, 'title-page');
  }
}
