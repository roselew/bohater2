import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { KidsService } from "../kids/kids.service";

@Component({
  selector: 'edit-kid',
  template: `
      <view-kid *ngIf="kid" [kid]="kid"></view-kid>
      <view-hero *ngIf="userHero" [userHero]="userHero"></view-hero>

      <button (click)="update()">Zapisz</button>
      <button class="altButton" (click)="remove()">Usuń</button>  
      <button class="altButton" routerLink="../">Powrót do dziecka </button>
  `,
  styles: [],

})
export class EditKidComponent implements OnInit {

  constructor(
    private service: KidsService,
    private router: Router,
    private route:ActivatedRoute,
  ) { }

  kid 
  userHero 

   ngOnInit(){
      let kidId =this.route.parent.snapshot.paramMap.get('kidId');
      this.service.getKidHero(kidId)
      .subscribe( kid => {
        this.kid = kid;
        this.userHero = kid['userHeroes'][0] ;
        delete this.kid['userHeroes'];
      })
   }

   update(){
     this.service.updateOneKid(this.kid)
      .subscribe( kid=> {
        this.kid= kid;
        this.service.updateOneHero(this.userHero)
        .subscribe( userHeroes => this.router.navigate(['/rodzic/dziecko/',this.kid['id']])
        )
      });
   }

   remove(){
     this.service.deleteOneKid(this.kid['id'])
      .subscribe( ()=> this.router.navigate(['/rodzic']))
   }


}
