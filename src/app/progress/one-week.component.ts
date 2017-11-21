import { Component, OnInit} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Location} from "@angular/common";


@Component({
  selector: 'one-week',
  template: `

  <div class="week">
    <span [routerLink]="['../',weekId -1]" class="prev">&lsaquo;</span>
    <a routerLink='../historia'>{{firstDate.getDate()}} {{monthNames[firstDate.getMonth()]}} - {{endDate.getDate()}} {{monthNames[endDate.getMonth()]}}</a>
    <span [routerLink]="['../',weekId +1]" class="next">&rsaquo;</span> 
  </div>		
  
  
    <div class="progress"> 
      <div class="progress-undone"> </div>
      <div class="progress-wait"> </div>
      <div class="progress-done"> </div> 
      <img src="../../assets/logo.png" class="logo">
    </div>
  
  
    <div class="filter">
      <button class="show-all"><span>{{tUndone+tWait+tDone}}</span></button>
      <button class="show-undone"><span>{{tUndone}}</span></button>
      <button class ="show-wait"><span>{{tWait}}</span></button>
      <button class="show-done"><span>{{tDone}}</span></button>
      <img src="../../assets/bohater.png" class="hero">
    </div>

 


  <div *ngFor="let day of days">
  <one-day-view *ngIf="mode=='parent'" (onChange)="show($event,day)" [dayId]="day"></one-day-view>
  <kid-one-day-view2 *ngIf="mode=='kid'" (onChange)="show($event,day)" [dayId]="day"></kid-one-day-view2>

  </div>
  `,
  styles: [],

})
export class OneWeekComponent implements OnInit {

  constructor(
    private router: Router,
    private route:ActivatedRoute, 
  ) { }

   weekId
  firstDay 
  endDay
  days
  thisDay;
  monthNames = ["styczeń","luty","marzec","kwiecień","maj","czerwiec","lipiec","sierpień","wrzesień","pażdziernik","listopad","grudzień"];
 mode
 firstDate
 endDate

  ngOnInit() { 
        let today = new Date();
    today.setHours(0,0,0,0);
    if (localStorage.getItem('loggedParent')){
      this.mode='parent'
    } else {
      this.mode='kid'
    }    

    //get week Id 
    this.route.paramMap.subscribe(paramMap => {
      this.weekId = parseInt(paramMap.get('weekId'));
      this.firstDay = 0 - today.getUTCDay() + 7* this.weekId;
      this.endDay = this.firstDay + 6;
      this.days=[this.firstDay, this.firstDay+1, this.firstDay+2, this.firstDay+3, this.firstDay+4, this.firstDay+5, this.endDay]
    
      this.firstDate = new Date();
      this.firstDate.setDate(this.firstDate.getDate() + this.firstDay);
      this.firstDate.setHours(0, 0, 0, 0);

      this.endDate = new Date();
      this.endDate.setDate(this.endDate.getDate() + this.endDay);
      this.endDate.setHours(0, 0, 0, 0);

    })
  }

   tDone =0
  tWait =0
  tUndone=0
  nDone=[];
  nWait=[];
  nUndone=[];


  show([nDone,nWait,nUndone],day){
    this.nDone[day-this.firstDay]=nDone;
    this.nWait[day-this.firstDay]=nWait;
    this.nUndone[day-this.firstDay]=nUndone;
    this.tDone=this.nDone.reduce((a, b) => a + b, 0);
    this.tWait=this.nWait.reduce((a, b) => a + b, 0);
    this.tUndone=this.nUndone.reduce((a, b) => a + b, 0);
  }
}
