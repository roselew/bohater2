import { Component, OnInit, Renderer2 } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Location} from "@angular/common";

@Component({
  selector: 'create-kid',
  template: `

   <app-header></app-header>
   
   <div class="title-container">

      <view-kid [kid]="kid"></view-kid>
      
      <button (click)="save()">DODAJ DZIECKO</button>
      <button routerLink="../">Powrót</button>

      <div class="form-group">
        <label for="expertHeroesoes">Days:</label>
          <div *ngFor="let expertHero of expertHeroes">
              <label>
                  <input type="radio"
                          name="expertHeroes"
                          (click)="selectHero(expertHero)"/>
                  {{expertHero.name}}
              </label>
          </div>
      </div>

  </div>

  `,
  styles: [],
})
export class CreateKidComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
    private route:ActivatedRoute,
    private renderer: Renderer2) { 
      this.renderer.addClass(document.body,'parent')
      this.renderer.addClass(document.body,'title-page')
    }
    
    ngOnDestroy() {
      this.renderer.removeClass(document.body, 'parent');
      this.renderer.removeClass(document.body, 'title-page');
    }

  parentId
  kid={};
  expertHeroes
  userHero

  save(){
  this.kid['parentId']=parseInt(this.parentId);
  
  this.http.post('http://localhost:3000/kids/', this.kid)
    .subscribe( kid=> {
      this.kid= kid; 

      this.userHero['kidId']=parseInt(this.kid['id'])
      this.http.post('http://localhost:3000/userHeroes/', this.userHero)
        .subscribe( userHero => {
          this.userHero = userHero;
          this.router.navigate(['/rodzic/dziecko/',this.kid['id']]);
        }) 
    });
  }

  ngOnInit() {
    this.parentId = parseInt(localStorage.getItem('loggedParent'));
    this.http.get('http://localhost:3000/expertHeroes')
      .subscribe( expertHeroes => this.expertHeroes = expertHeroes)
  }

  selectHero(expertHero){
    this.userHero=expertHero;
  }
}
