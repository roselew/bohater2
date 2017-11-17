import { Component, OnInit} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Location} from "@angular/common";


@Component({
  selector: 'one-week',
  template: `
  <button [routerLink]="['../',weekId -1]"> Poprzedni </button>
  <button [routerLink]="['../',weekId +1]"> Następny </button>

  <p>Łącznie w tym tygodniu</p>
  <p> {{tDone}} - zrobione <p>
  <p> {{tWait}} - oczekujące </p>
  <p> {{tUndone}} - niezrobione </p>

  <div *ngFor="let day of days">
  <one-day-view *ngIf="mode=='parent'" (onChange)="show($event,day)" [dayId]="day"></one-day-view>
  <kid-one-day-view *ngIf="mode=='kid'" (onChange)="show($event,day)" [dayId]="day"></kid-one-day-view>

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

  ngOnInit() { 
        let today = new Date();
    today.setHours(0,0,0,0);
    if (localStorage.getItem('loggedParent')){
      this.mode='parent'
    } else {
      this.mode='kid'
    }
    console.log(this.mode)
    

    //get week Id 
    this.route.paramMap.subscribe(paramMap => {
      this.weekId = parseInt(paramMap.get('weekId'));
      this.firstDay = 0 - today.getUTCDay() + 7* this.weekId;
      this.endDay = this.firstDay + 6;
      this.days=[this.firstDay, this.firstDay+1, this.firstDay+2, this.firstDay+3, this.firstDay+4, this.firstDay+5, this.endDay]
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
