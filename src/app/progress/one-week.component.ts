import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'one-week',
  template: `

  <div class="week">
    <span [routerLink]="['../',weekId -1]" class="prev">&lsaquo;</span>
    <a routerLink='../historia'>{{firstDate.getDate()}} {{firstDate.getMonth()==endDate.getMonth() ? '' : monthNames[firstDate.getMonth()]}} - {{endDate.getDate()}} {{monthNames[endDate.getMonth()]}}</a>
    <span [routerLink]="['../',weekId +1]" class="next">&rsaquo;</span> 
  </div>		
  
  <progress-bar-week 
    [waitWidth]="100*(tWait+tDone)/(tUndone+tWait+tDone)" 
    [doneWidth]="100*tDone/(tUndone+tWait+tDone)">
  </progress-bar-week>
 
    <div class="filter">
      <button class="show-all" (click)="applyFilter('all')" [ngClass]="{'selected': (filter=='all')}"><span>{{tUndone+tWait+tDone}}</span>
        </button><button class="show-undone" (click)="applyFilter('undone')" [ngClass]="{'selected': (filter=='undone')}"><span>{{tUndone}}</span>
        </button><button class ="show-wait" (click)="applyFilter('wait')" [ngClass]="{'selected': (filter=='wait')}"><span>{{tWait}}</span>
        </button><button class="show-done" (click)="applyFilter('done')" [ngClass]="{'selected': (filter=='done')}"><span>{{tDone}}</span>
      </button>
      <img src="../../assets/bohater.png" class="hero">
    </div>

   <div *ngFor="let day of days">
    <one-day-view 
        (onChange)="show($event,day)" 
        [mode]="mode" 
        [type]="type"
        [filter]="filter"
        [dayId]="day">
    </one-day-view>
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
  firstDate
  endDate
  days
  monthNames = ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"];
  firstDay
  mode
  type='weekView'
  filter

  applyFilter(filterMode){
    this.filter=filterMode
  }

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

      this.weekId = +paramMap.get('weekId');
      
      this.firstDay = 0 - today.getUTCDay() + 7* this.weekId;
      
      this.firstDate = new Date(today);
      this.firstDate.setDate(this.firstDate.getDate() + this.firstDay);
      this.firstDate.setHours(0, 0, 0, 0);
      
      this.endDate = new Date(this.firstDate);
      this.endDate.setDate(this.firstDate.getDate() + 6);
      this.endDate.setHours(0, 0, 0, 0);
      
      this.days=[this.firstDay, this.firstDay+1, this.firstDay+2, this.firstDay+3, this.firstDay+4, this.firstDay+5, this.firstDay+6]
    
    })

    this.route.queryParamMap.subscribe(paramMap =>  {
      this.filter = paramMap.get('filter') || 'all';
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
