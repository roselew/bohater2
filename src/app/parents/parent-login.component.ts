import { Component, OnInit, Renderer2} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ParentsService } from "./parents.service";
import { UsersService } from "../session/users.service";

@Component({
  selector: 'parent-login',
  template: `

  <app-header [simpleH1]="'Rodzic'" [skewH1]="'Logowanie'"></app-header> 

  <div class="title-container">
   
    <form #formRef="ngForm" (submit)="login(formRef)">

      <input type='text' placeholder='Email' [(ngModel)]="parent['email']" name="email">
         <span *ngIf="formRef.controls.email?.touched  || formRef.controls.email?.dirty"> 
          <small *ngIf="formRef.controls.email?.errors?.required" class="form-text text-muted">Field is required</small>
          <small *ngIf="formRef.controls.email?.errors?.email" class="form-text text-muted">Invalid email format</small>
        </span>

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
 
    login(form) {
    if(form.invalid){
      return;
    }
      console.log('udalo sie')
//     localStorage.clear()
//     localStorage.setItem('loggedParent',parentId)  
//     this.router.navigate(['/rodzic'])  
  }
  
  logOn(parentId){
    this.users.setLoggedUser('parent',parentId)
    this.router.navigate(['/rodzic'])  
  }

  constructor(
    private users: UsersService,
    private service: ParentsService,
    private router: Router,
    private route:ActivatedRoute,
    private renderer: Renderer2) { 
      this.renderer.addClass(document.body,'parent')
      this.renderer.addClass(document.body,'title-page')
    }

  parents

  ngOnInit() {
    this.service.fetchParents()
    .subscribe( parents => this.parents = parents )
  }


  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'parent');
    this.renderer.removeClass(document.body, 'title-page');
  }
}
