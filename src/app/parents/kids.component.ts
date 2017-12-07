import { Component, OnInit, Renderer2} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ParentsService } from "./parents.service";

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
    private service: ParentsService,
    private router: Router,
    private route:ActivatedRoute,
    private renderer: Renderer2) { 
      this.renderer.addClass(document.body,'title-page')
    }

    ngOnDestroy() {
      this.renderer.removeClass(document.body, 'title-page');
    }
  
  parent = {};
  kids

   ngOnInit(){
     let parentId = parseInt(localStorage.getItem('loggedParent'));
     this.service.getParentKids(parentId)
        .subscribe( parent => {
          this.parent = parent;
          this.kids = this.parent['kids']
         })
   } 
}
