import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Location} from "@angular/common";


@Component({
  selector: 'one-week',
  template: `

  <button [routerLink]="['../../']"> Powrót do menu dziecka </button>
  <button [routerLink]="['../../one-week/',weekId -1]"> Poprzedni </button>
  <button [routerLink]="['../../one-week/',weekId +1]"> Następny </button>

  <p>Łącznie w tym tygodniu</p>
  <p> {{tDone}} - zrobione <p>
  <p> {{tWait}} - oczekujące </p>
  <p> {{tUndone}} - niezrobione </p>

  
  <div *ngFor="let day of days">
    <one-day-view (onChange)="show($event,day)" [dayId]="day"></one-day-view>
  </div>



  `,
  styles: [],

})
export class OneWeekComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
    private route:ActivatedRoute,
    private location:Location,
    
  ) { }

  weekId
  kid = {};
  firstDay 
  endDay
  days
  thisDay;
  monthNames = ["styczeń","luty","marzec","kwiecień","maj","czerwiec","lipiec","sierpień","wrzesień","pażdziernik","listopad","grudzień"];


  ngOnInit() {

    this.weekId = parseInt(this.route.snapshot.paramMap.get('weekId'));
    
    let today = new Date();
    today.setHours(0,0,0,0);

    this.firstDay = 0 - today.getUTCDay() + 7* this.weekId;
    this.endDay = this.firstDay + 6;

    //get kid Id 
    this.kid['id']=this.route.snapshot.paramMap.get('kidId');

    this.days=[this.firstDay, this.firstDay+1, this.firstDay+2, this.firstDay+3, this.firstDay+4, this.firstDay+5, this.endDay]
  }

  tDone 
  tWait 
  tUndone
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
