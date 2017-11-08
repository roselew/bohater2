import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Location} from "@angular/common";

@Component({
  selector: 'mission',
  template: `
      <label>Name</label>
      <input [(ngModel)]="mission.name">
      <button (click)="update()">Zapisz</button>
      <button (click)="remove()">Usuń</button>
      <button (click)="goBack()">Powrót do listy</button>
      <button (click)="done()">Wykonane!</button>
  `,
  styles: [],

})
export class MissionComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
    private route:ActivatedRoute,
    private location:Location,
    
  ) { }

  mission = {};
  doneMission = {};

  done(){
    this.doneMission['doneDate']= new Date();
    this.doneMission['missionId']=this.mission['id'];
    this.http.post('http://localhost:3000/doneMissions/', this.doneMission)
      .subscribe( );
    }
  }

   ngOnInit(){
      this.mission['id']=this.route.snapshot.paramMap.get('missionId');
      this.http.get('http://localhost:3000/userMissions/'+this.mission['id'])
        .subscribe( mission => this.mission = mission )
   }

   update(){
      this.http.put('http://localhost:3000/userMissions/'+ this.mission['id'], this.mission)
      .subscribe( mission=> {this.mission= mission; this.goBack();});
   }

   remove(){
       this.http.delete('http://localhost:3000/userMissions/'+ this.mission['id'])
       .subscribe( ()=> this.goBack())
   }

   goBack(){
     this.location.back();
   }
   
}
