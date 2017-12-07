import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Location} from "@angular/common";

@Component({
  selector: 'create-kid',
  template: `

  <app-header [simpleH1]="'Dodaj'" [skewH1]="'Dziecko'"></app-header> 
   
   <div class="title-container">

      <view-kid [kid]="kid" ></view-kid>
      <view-hero [userHero]="userHero"></view-hero>

    <button (click)="save()">DODAJ DZIECKO</button>
    <button class="altButton" routerLink="../">Powrót</button>

  </div>

  `,
  styles: [],
})
export class CreateKidComponent implements OnInit {

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

  parentId
  expertHeroes

  kid={};
  userHero={};

  save(){
  this.kid['parentId']=parseInt(this.parentId);
  this.http.post(this.API_URL+ 'kids/', this.kid)
    .subscribe( kid=> {
      this.kid= kid; 
      this.userHero['kidId']=parseInt(this.kid['id'])
      this.http.post(this.API_URL+ 'userHeroes/', this.userHero)
        .subscribe( userHero => {
          this.userHero = userHero;
          this.router.navigate(['/rodzic']);
        }) 
    });
  }

  ngOnInit() {
    this.parentId = parseInt(localStorage.getItem('loggedParent'));
  }


}
