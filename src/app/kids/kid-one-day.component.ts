import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { MissionsService } from "../missions/missions.service";
import { UsersService } from "../session/users.service";

@Component({
  selector: 'kid-one-day',
  template: `

  <div class="dayName">
    <span [routerLink]="['../',dayId -1]" class="prev">&lt;</span>
    <p>{{thisDay.getDate()}} {{monthNames[thisDay.getMonth()]}}</p>
    <span [routerLink]="['../',dayId +1]" class="next">&gt;</span> 
  </div>

  <one-day-view *ngIf="userMissions"
        (onChange)="fetchMissions()" 
        [mode]= "mode"
        [type]= "type"
        [dayId]= "dayId"
        [userMissions] = "userMissions">
  </one-day-view>
    
   `,
  styles: [],

})

export class KidOneDayComponent implements OnInit {

  constructor(
    private users: UsersService,
    private service: MissionsService,
    private router: Router,
    private route: ActivatedRoute,  
  ) { }

  kidId
  userMissions
  dayId
  thisDay
  monthNames = ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"];
  mode = 'kid'
  type = 'dayView'

  ngOnInit(){
    
    this.kidId = this.users.getLoggedUser('kid');
    this.fetchMissions();
    
    this.route.paramMap.subscribe(paramMap => {
      this.dayId = +paramMap.get('dayId');
      this.thisDay = new Date();
      this.thisDay.setDate(this.thisDay.getDate() + this.dayId);
      this.thisDay.setHours(0, 0, 0, 0);
    })

  }
  
  fetchMissions(){
    this.service.fetchMissions(this.kidId) 
       .subscribe ( userMissions => this.userMissions = userMissions )     
  }
  
}
