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
      <button (click)="goBack()">Powrót do listy</button>

      <p>Lista misji dziecka</p>
      <ul> 
        <li *ngFor="let userMission of userMissions" [routerLink]="[userMission.id]"> 
          {{ userMission.name }} 
        </li> 
      </ul> 
      <button routerLink="new-mission"> Dodaj nową misję </button>
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

   ngOnInit(){
      this.kid['id']=this.route.snapshot.paramMap.get('kidId');
      this.http.get('http://localhost:3000/kids/'+this.kid['id'])
        .subscribe( kid => this.kid = kid )
      this.http.get('http://localhost:3000/kids/'+this.kid['id']+'/userMissions')
        .subscribe( userMissions => this.userMissions = userMissions )
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
