import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'kid-one-day',
  template: `

  <button [routerLink]="['../',dayId -1]"> Poprzedni </button>
  <button [routerLink]="['../',dayId +1]"> Następny </button>
  
  <p>Łącznie tego dnia</p>
  <p> {{nDone}} - zrobione <p>
  <p> {{nWait}} - oczekujące </p>
  <p> {{nUndone}} - niezrobione </p>
  
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

  show([nDone,nWait,nUndone]){
    this.nDone=nDone;
    this.nWait=nWait;
    this.nUndone=nUndone;
  }

  @Input()
  dayId

  ngOnInit(){
    this.route.paramMap.subscribe(paramMap => {
      this.dayId = parseInt(paramMap.get('dayId'));
    })

  }
  
}