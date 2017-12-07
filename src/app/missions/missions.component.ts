import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Location} from "@angular/common";

@Component({
  selector: 'missions',
  template: `

  <ul class="mission-neutral">
    <li 
      *ngFor="let mission of activeMissions" 
      [routerLink]="[mission.id]"
      class="circle-big"> 
        <p>
          <span class="dayList"> {{showDays(mission)}}</span>
          {{mission.name}}
        </p>
        <img src="{{mission.icon}}">
        <star-svg></star-svg>
        <span>{{mission.points}}</span>
    </li> 
  </ul>

 <p *ngIf="unactiveMissions && unactiveMissions.length>0" class="smallTitle">Zakończone misje </p>
  <ul class="mission-neutral mission-unactive">
  <li 
    *ngFor="let mission of unactiveMissions"       
    class="circle-big"> 
      <p>
        <span class="dayList"> {{showDays(mission)}}</span>
        {{mission.name}}
      </p>
      <img src="{{mission.icon}}">
      <star-svg></star-svg>
      <span>{{mission.points}}</span>
  </ul>

  
    <div class="plus" routerLink="dodaj">+</div>

       
        `,
  styles: [],
})
export class MissionsComponent implements OnInit {

  constructor(
    @Inject('API_URL') private API_URL,
    private router: Router,
    private http: HttpClient,
    private route:ActivatedRoute,
  ) { }

  kid = {};
  userMissions
  activeMissions
  unactiveMissions

  days=['PN','WT','ŚR','CZ','PT','SB','ND']

  showDays(mission){
    return mission.days.map(x=> this.days[x]).join(' ')
  }

  ngOnInit(){

    let today = new Date()
    today.setHours(0,0,0,0)
      let kidId=this.route.parent.snapshot.paramMap.get('kidId');
      this.http.get(this.API_URL+ 'kids/'+kidId+'?_embed=userMissions')
      .subscribe( kid => {
        this.kid = kid;
        this.userMissions = this.kid['userMissions'];
        this.activeMissions=this.userMissions.filter( x => !x.finish)
        this.unactiveMissions = this.userMissions.filter( x => x.finish)
       })
   }
}
