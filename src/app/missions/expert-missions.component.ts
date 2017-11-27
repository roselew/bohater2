import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'expert-missions',
  template: `
   <ul class="mission-neutral"> 
    <span class="showMore bounce">▼</span>
    <li *ngFor="let mission of missions"
    class="circle-mid"
    [routerLink]="['../dodaj-polecana/' + mission.id]"
    > 
      <p>{{ mission.name }} </p>
      <img src="{{mission.icon}}">
    </li> 
  </ul> 
  `,
  styles: [],
})
export class ExpertMissionsComponent implements OnInit {

  constructor(private http: HttpClient) { }

  missions

   ngOnInit(){
        this.http.get('http://localhost:3000/expertMissions')
        .subscribe( missions => this.missions = missions )
   }
}
