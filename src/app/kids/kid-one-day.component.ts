import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'kid-one-day',
  template: `

  <div class="dayName">
    <span [routerLink]="['../',dayId -1]" class="prev">&lt;</span>
    <p>{{thisDay.getDate()}} {{monthNames[thisDay.getMonth()]}}</p>
    <span [routerLink]="['../',dayId +1]" class="next">&gt;</span> 
  </div>

  <one-day-view 
        (onChange)="show($event)" 
        [mode]= "mode"
        [type]= "type"
        [dayId]= "dayId">
  </one-day-view>
    
   `,
  styles: [],

})

export class KidOneDayComponent implements OnInit {

  constructor(
    private router: Router,
    private route:ActivatedRoute,  
  ) { }


  dayId
  thisDay
  monthNames = ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"];
  mode = 'kid'
  type = 'dayView'

  ngOnInit(){
    this.route.paramMap.subscribe(paramMap => {
      this.dayId = +paramMap.get('dayId');
      this.thisDay = new Date();
      this.thisDay.setDate(this.thisDay.getDate() + this.dayId);
      this.thisDay.setHours(0, 0, 0, 0);
    })
  }
  

  nDone
  nWait
  nUndone
  
  show([nDone,nWait,nUndone],day){
    this.nDone=nDone;
    this.nWait=nWait;
    this.nUndone=nUndone;
  }

  
}