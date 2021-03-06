import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { MissionsService } from "../services/missions.service";

@Component({
  selector: 'missions',
  template: `

  <ul *ngIf="userMissions && userMissions.length>0; else other_content" class="mission-neutral">
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

  <ng-template #other_content>
    <p class="smallTitle"> Dziecko nie ma jeszcze żadnych misji. Dodaj kilka przyciskiem <span>+</span> w prawym dolnym rogu strony</p>
  </ng-template>

 <p *ngIf="unactiveMissions && unactiveMissions.length>0" class="smallTitle">Zakończone misje </p>
  <ul class="mission-neutral mission-unactive">
  <li 
    *ngFor="let mission of unactiveMissions"       
    class="circle-big"> 
      <p>
        <span class="dayList"> {{showDays(mission)}}</span>
        {{mission.name}} <br> <span class="period"> od {{mission.start | date:'d.M.yy'}} do {{mission.finish| date:'d.M.yy'}}</span>
      </p>
      <img src="{{mission.icon}}">
      <star-svg></star-svg>
      <span>{{mission.points}}</span>
  </ul>
  
    <div class="plus" routerLink="dodaj">+</div>
       
        `,
  styles: [`
  .period{
    font-size: 1rem;
    position:relative;
    line-height: 2rem;
    width: 100%;
    top:auto;
    right:auto;
    color:#777B88;
  }
    `],
})
export class MissionsComponent implements OnInit {

  constructor(
    private service: MissionsService,
    private router: Router,
    private route:ActivatedRoute,
  ) { }

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
      this.service.fetchMissions(kidId)
      .subscribe( userMissions => {
        this.userMissions = userMissions;
        this.activeMissions=this.userMissions.filter( x => !x.finish)
        this.unactiveMissions = this.userMissions.filter( x => x.finish)
      })
   }
}
