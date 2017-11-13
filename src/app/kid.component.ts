import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Location} from "@angular/common";

@Component({
  selector: 'kid',
  template: `
      <label>Name</label>
      <input [(ngModel)]="kid.name">
      <button (click)="update()">Zapisz</button>
      <button (click)="remove()">Usuń</button>
      <button [routerLink]="['../']">Powrót do listy</button>

      <button [routerLink]="['one-week/',0]"> Postępy tydodniowe </button>
      <button [routerLink]="['one-day/',0]"> Postępy dzienne </button>

      <p>W sumie zdobył {{totalPoints}} punktów</p>

      <p>Lista misji dziecka</p>
      <ul> 
        <li *ngFor="let userMission of userMissions" [routerLink]="['mission/'+userMission.id]"> 
          {{ userMission.name }} 
        </li> 
      </ul> 
      <button routerLink="new-mission"> Dodaj nową misję </button>

      <p>Lista nagród dziecka</p>
      <ul> 
        <li *ngFor="let userGift of userGifts" [routerLink]="['gift/'+userGift.id]"> 
          {{ userGift.name }} 
        </li> 
      </ul> 
      <button routerLink="new-gift"> Dodaj nową nagrodę </button>
  `,
  styles: [],
})
export class KidComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
    private route:ActivatedRoute,
    private location:Location,
    
  ) { }

  kid = {};
  userMissions
  userGifts
  totalPoints = 0

   ngOnInit(){
      this.kid['id']=this.route.snapshot.paramMap.get('kidId');
      this.http.get('http://localhost:3000/kids/'+this.kid['id'])
        .subscribe( kid => this.kid = kid )
      this.http.get('http://localhost:3000/kids/'+this.kid['id']+'/userMissions')
        .subscribe( userMissions => {
          this.userMissions = userMissions;
          this.calculatePoints();
         })
      this.http.get('http://localhost:3000/kids/'+this.kid['id']+'/userGifts')
        .subscribe( userGifts  => this.userGifts = userGifts )
      }

  calculatePoints(){
    for (let mission of this.userMissions){
      this.totalPoints += mission['doneDates'].length * mission['points']
    }
  }

   update(){
      this.http.put('http://localhost:3000/kids/'+ this.kid['id'], this.kid)
      .subscribe( kid=> {this.kid= kid; this.goBack();});
   }

   remove(){
       this.http.delete('http://localhost:3000/kids/'+ this.kid['id'])
       .subscribe( ()=> this.goBack())
   }

   goBack(){
     this.location.back();
   }

}
