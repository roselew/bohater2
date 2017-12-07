import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Location} from "@angular/common";

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
    @Inject('API_URL') private API_URL,
    private router: Router,
    private http: HttpClient,
    private route:ActivatedRoute,
  ) { }

  kid 
  userHero 

   ngOnInit(){
      let kidId =this.route.parent.snapshot.paramMap.get('kidId');
      this.fetch(kidId)
   }

   update(){
      this.http.put(this.API_URL+ 'kids/'+ this.kid['id'], this.kid)
      .subscribe( kid=> {
        this.kid= kid;
        this.http.put(this.API_URL+ 'userHeroes/'+ this.userHero['id'], this.userHero)
        .subscribe( userHeroes => this.router.navigate(['/rodzic/dziecko/',this.kid['id']])
        )
      });
   }

   remove(){
      this.http.delete(this.API_URL+ 'kids/'+ this.kid['id'])
      .subscribe( ()=> this.router.navigate(['/rodzic']))
   }

   fetch(kidId){
      this.http.get(this.API_URL+ 'kids/'+kidId + '?_embed=userHeroes')
      .subscribe( kid => {
        this.kid = kid;
        this.userHero = kid['userHeroes'][0] ;
        delete this.kid['userHeroes'];
      })
   }

}
