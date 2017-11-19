import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Location} from "@angular/common";

@Component({
  selector: 'missions',
  template: `
        <p>Lista misji dziecka</p>
        <ul> 
          <li *ngFor="let mission of activeMissions" [routerLink]="[mission.id]"> 
            {{ mission.name }} 
          </li> 
        </ul> 

        <p>Lista zakończonych misji </p>
        <ul> 
          <li *ngFor="let mission of unactiveMissions"> 
            {{ mission.name }} 
          </li> 
        </ul> 
        <button routerLink="dodaj"> Dodaj nową misję </button>

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
  activeMissions
  unactiveMissions


  ngOnInit(){

    let today = new Date()
    today.setHours(0,0,0,0)
      this.kid['id']=this.route.parent.snapshot.paramMap.get('kidId');
      this.http.get('http://localhost:3000/kids/'+this.kid['id']+'?_embed=userMissions')
      .subscribe( kid => {
        this.kid = kid;
        this.userMissions = this.kid['userMissions'];
        this.activeMissions=this.userMissions.filter( x => !x.finish)
        this.unactiveMissions = this.userMissions.filter( x => x.finish)
       })
   }
}
