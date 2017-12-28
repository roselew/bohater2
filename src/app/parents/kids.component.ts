import { Component, OnInit, Renderer2} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from "../services/users.service";

@Component({
  selector: 'kids',
  template: `

  <header>	
	  <div class="header-banner">MENU</div>
	  <img src="assets/logo.png" class="logo">
  </header>

  <div class="container">

  <div class="kid-container" *ngFor="let kid of kids">
    <shortcut-kid [kidId]="kid.id"></shortcut-kid>
  </div>
  
  <a routerLink="dodaj-dziecko">
    <div class="plus">+</div>
  </a>

  `,
  styles: [],
})
export class KidsComponent implements OnInit {

  constructor(
    public users: UsersService,
    private router: Router,
    private route:ActivatedRoute,
    private renderer: Renderer2) { 
      this.renderer.addClass(document.body,'title-page')
    }

    ngOnDestroy() {
      this.renderer.removeClass(document.body, 'title-page');
    }
  
  kids

   ngOnInit(){
     this.users.getParentKids()
        .subscribe( kids => {
          this.kids = kids;
         })
   } 
}
