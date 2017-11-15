import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Location} from "@angular/common";

@Component({
  selector: 'missions',
  template: `
        <p>Lista misji dziecka</p>
        <ul> 
          <li *ngFor="let userMission of userMissions" [routerLink]="[userMission.id]"> 
            {{ userMission.name }} 
          </li> 
        </ul> 
        <button routerLink="new-mission"> Dodaj nową misję </button>

        <button routerLink="../">Powrót do dziecka </button>
  `,
  styles: [],
})
export class MissionsComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
    private route:ActivatedRoute,
  ) { }

  kid = {};
  userMissions

  ngOnInit(){
      this.kid['id']=this.route.snapshot.paramMap.get('kidId');
      this.http.get('http://localhost:3000/kids/'+this.kid['id']+'?_embed=userMissions')
      .subscribe( kid => {
        this.kid = kid;
        this.userMissions = this.kid['userMissions'];
       })
   }
}
