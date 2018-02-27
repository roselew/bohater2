import { Component, OnInit, Renderer2} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from "../services/users.service";
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'kids',
  template: `

  <header>	
	  <div [routerLink]="['/rodzina/menu']" class="header-banner">Menu</div>
    <img src="assets/logo.png" class="logo">
  </header>

  <div class="container">

  <div class="kid-container" *ngFor="let kid of kids">
    <shortcut-kid [kidId]="kid.id"></shortcut-kid>
  </div>

  <p *ngIf="kids && kids.length == 0" class="smallTitle"> Dodaj dziecko przyciskiem <span>+</span> w prawym dolnym rogu strony</p>
  
  <a routerLink="dodaj-dziecko">
    <div class="plus">+</div>
  </a>

  <a [routerLink]="['/rodzina']">
    <div class="back">←</div>
  </a>

  <app-spinner *ngIf="showSpinner"></app-spinner>
  `,
  styles: [`
  @media (min-width: 1200px){  
  .container {max-width: 1500px; margin-top: 5%;}
  }
  `],
})
export class KidsComponent implements OnInit {

  constructor(
    public afAuth: AngularFireAuth,
    public users: UsersService,
    private router: Router,
    private route:ActivatedRoute,
    private renderer: Renderer2) { 
      this.renderer.addClass(document.body,'title-page')
    }

    ngOnDestroy() {
      this.renderer.removeClass(document.body, 'title-page');
    }
  
    showSpinner: boolean = true

    logout() {
      this.afAuth.auth.signOut()
      .then( () => this.router.navigate(['/witaj']))
    }

  kids
  parent 
   ngOnInit(){

    this.parent = this.users.currentUserEmail

     this.users.getParentKids()
        .subscribe( kids => {
          this.kids = kids;
          this.showSpinner = false
         })
   } 
}
