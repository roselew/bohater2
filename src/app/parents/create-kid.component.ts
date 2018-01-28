import { Component, OnInit, Renderer2} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { UsersService } from "../services/users.service";

@Component({
  selector: 'create-kid',
  template: `

  <app-header [simpleH1]="'Dodaj'" [skewH1]="'Dziecko'"></app-header> 
   
   <div class="title-container">

      <app-spinner *ngIf="showSpinner"></app-spinner>

      <view-kid *ngIf="!showSpinner" [kid]="kid" [codes]="codes"></view-kid>

    <button *ngIf="!showSpinner" (click)="save()">DODAJ DZIECKO</button>

    <a [routerLink]="['../']">
      <div class="back">←</div>
    </a>

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

  showSpinner: boolean = false

  codes=[
    {name: 'code1', value: 0, checked: false},
    {name: 'code2', value: 1, checked: false},
    {name: 'code3', value: 2, checked: false},
    {name: 'code4', value: 3, checked: false},
    {name: 'code5', value: 4, checked: false},
    {name: 'code6', value: 5, checked: false},
    {name: 'code7', value: 6, checked: false},
    {name: 'code8', value: 7, checked: false},
    {name: 'code9', value: 8, checked: false}
  ];

  save(){
      this.showSpinner = true
      this.kid['code']=this.codes.filter(x => x.checked==true).map(x => x.value);
      this.kid['parentId']=this.users.currentUserEmail;
      this.kid['badges']=[false,false,false,false,false,false,false,false,false]
      this.users.createOneKid(this.kid)
      .then( () => {
        this.router.navigate(['/rodzina/rodzic/dzieci']); 
        this.showSpinner = false;
      })
    }
  

  ngOnInit(){ }


}
