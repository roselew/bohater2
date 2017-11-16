import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'expert-missions',
  template: `
   <ul> 
    <li *ngFor="let mission of missions"
    [routerLink]="['../dodaj-polecana/' + mission.id]"
    > 
      {{ mission.name }} 
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
