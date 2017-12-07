import { Component, OnInit, Renderer2 } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from '@angular/router';

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
    @Inject('API_URL') private API_URL,
    private router: Router,
    private http: HttpClient,
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
      this.http.get(this.API_URL+ 'parents/'+parentId+'?_embed=kids')
        .subscribe( parent => {
          this.parent = parent;
          this.kids = this.parent['kids']
         })
   } 
}
