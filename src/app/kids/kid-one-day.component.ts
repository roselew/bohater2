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

  <kid-one-day-view (onChange)="show($event)" [dayId]="dayId"></kid-one-day-view>
   `,
  styles: [],

})
export class KidOneDayComponent implements OnInit {

  constructor(
    private router: Router,
    private route:ActivatedRoute,  

  ) { }

  nDone
  nWait
  nUndone
  monthNames = ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"];
  
  show([nDone,nWait,nUndone]){
    this.nDone=nDone;
    this.nWait=nWait;
    this.nUndone=nUndone;
  }


  dayId
  thisDay

  ngOnInit(){
    this.route.paramMap.subscribe(paramMap => {
      this.dayId = parseInt(paramMap.get('dayId'));
      this.thisDay = new Date();
      this.thisDay.setDate(this.thisDay.getDate() + this.dayId);
      this.thisDay.setHours(0, 0, 0, 0);
    })
    

  }
  
}