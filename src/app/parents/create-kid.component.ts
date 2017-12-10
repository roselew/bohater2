import { Component, OnInit, Renderer2} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { UsersService } from "../services/users.service";

@Component({
  selector: 'create-kid',
  template: `

  <app-header [simpleH1]="'Dodaj'" [skewH1]="'Dziecko'"></app-header> 
   
   <div class="title-container">

      <view-kid [kid]="kid" ></view-kid>

    <button (click)="save()">DODAJ DZIECKO</button>
    <button class="altButton" routerLink="../">Powrót</button>

  </div>

  `,
  styles: [],
})
export class CreateKidComponent implements OnInit {

  constructor(
    private users: UsersService,
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
  userHeroId

  save(){
  let parentId = this.users.getLoggedUser('parent');
  this.kid['parentId']=parentId;
  this.kid['badges']=[false,false,false,false,false,false,false,false,false]
  this.users.createOneKid(this.kid)
    .subscribe( kid=> {
      this.kid= kid; 
      this.router.navigate(['/rodzic']);
    })
  }

  ngOnInit() { }


}
