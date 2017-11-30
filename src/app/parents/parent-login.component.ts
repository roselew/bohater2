import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'parent-login',
  template: `

  <app-header [simpleH1]="'Rodzic'" [skewH1]="'Logowanie'"></app-header> 

  <div class="title-container">
   
    <form>

      <input type='text' placeholder='Email' [(ngModel)]="parent['email']" name="email">

      <input type='password' placeholder='Hasło' [(ngModel)]="parent['password']" name="password">

      <input type='checkbox' name='remember'>
      <label for='checkbox'>Zapamiętaj mnie</label>

      <button type='submit'>ZALOGUJ</button>

    </form>
    <a routerLink='/rodzic-rejestracja'>Nie masz konta? Zarejestruj się</a>

    <p> Logowanie tymczasowe, kliknij na rodzica żeby się zalogować </p>
    <ul>
      <li *ngFor="let parent of parents"
          (click)="logOn(parent.id)">
          {{parent.email}}
      </li>
    </ul>
  
  </div>


  `,
  styles: [],

})
export class ParentLoginComponent implements OnInit {

 parent ={}
 
  logOn(parentId){
    localStorage.clear()
    localStorage.setItem('loggedParent',parentId)  
    this.router.navigate(['/rodzic'])  
  }

  constructor(
    private router: Router,
    private http: HttpClient,
    private route:ActivatedRoute,
    private renderer: Renderer2) { 
      this.renderer.addClass(document.body,'parent')
      this.renderer.addClass(document.body,'title-page')
    }

  parents

  ngOnInit() {
    this.http.get('http://localhost:3000/parents/')
    .subscribe( parents => this.parents = parents )
  }


  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'parent');
    this.renderer.removeClass(document.body, 'title-page');
  }
}
