import { Component, OnInit, Renderer2} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { KidsService } from "../kids/kids.service";

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
    private service: KidsService,
    private router: Router,
    private route:ActivatedRoute,
    private renderer: Renderer2) { 
      this.renderer.addClass(document.body,'title-page')
    }
    
    ngOnDestroy() {
      this.renderer.removeClass(document.body, 'title-page');
    }

  expertHeroes
  kid={};
  userHero={};

  save(){
  let parentId = +localStorage.getItem('loggedParent');
  this.kid['parentId']=parentId;
  this.service.createOneKid(this.kid)
    .subscribe( kid=> {
      this.kid= kid; 
      this.userHero['kidId']=parseInt(this.kid['id'])
      this.service.createOneHero(this.userHero)
        .subscribe( userHero => {
          this.userHero = userHero;
          this.router.navigate(['/rodzic']);
        }) 
    });
  }

  ngOnInit() { }


}
