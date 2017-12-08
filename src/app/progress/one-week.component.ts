import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { MissionsService } from "../missions/missions.service"
import { UsersService } from "../session/users.service"

@Component({
  selector: 'one-week',
  template: `

  <div class="week">
    <span [routerLink]="['../',weekId -1]" class="prev">&lsaquo;</span>
    <a routerLink='../historia'>{{firstDate.getDate()}} {{firstDate.getMonth()==endDate.getMonth() ? '' : monthNames[firstDate.getMonth()]}} - {{endDate.getDate()}} {{monthNames[endDate.getMonth()]}}</a>
    <span [routerLink]="['../',weekId +1]" class="next">&rsaquo;</span> 
  </div>		
  
  <progress-bar-week *ngIf="weekProgress"
    [waitWidth]="100*(weekProgress.nWait+weekProgress.nDone)/weekProgress.nAll" 
    [doneWidth]="100*weekProgress.nDone/weekProgress.nAll">
  </progress-bar-week>
 
    <div class="filter" *ngIf="weekProgress">
      <button class="show-all" (click)="applyFilter('all')" [ngClass]="{'selected': (filter=='all')}"><span>{{weekProgress.nAll}}</span>
        </button><button class="show-undone" (click)="applyFilter('undone')" [ngClass]="{'selected': (filter=='undone')}"><span>{{weekProgress.nAll-weekProgress.nWait-weekProgress.nDone}}</span>
        </button><button class ="show-wait" (click)="applyFilter('wait')" [ngClass]="{'selected': (filter=='wait')}"><span>{{weekProgress.nWait}}</span>
        </button><button class="show-done" (click)="applyFilter('done')" [ngClass]="{'selected': (filter=='done')}"><span>{{weekProgress.nDone}}</span>
      </button>
      <img src="../../assets/bohater.png" class="hero">
    </div>

   <div *ngFor="let day of days">
    <one-day-view *ngIf="userMissions"
        (onChange)="fetchMissions()" 
        [mode]="mode" 
        [type]="type"
        [filter]="filter"
        [dayId]="day"
        [userMissions]="userMissions">
    </one-day-view>
  </div>
  
  `,
  styles: [],

})
export class OneWeekComponent implements OnInit {

  constructor(
    private users: UsersService,
    private service: MissionsService,
    private router: Router,
    private route: ActivatedRoute, 
  ) { }


  @Input() mode
  
  weekId
  firstDate
  endDate
  weekProgress
  days
  monthNames = ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"];
  firstDay
  type='weekView'
  filter
  kidId
  userMissions

  applyFilter(filterMode){
    this.filter=filterMode
  }

  ngOnInit() { 

    //get kid Id
    if (this.mode=='kid'){
      this.kidId = this.users.getLoggedUser('kid');
    } else {
      this.kidId = +this.route.parent.snapshot.paramMap.get('kidId');
    }
  
    //get week Id 
    this.route.paramMap.subscribe(paramMap => {

      this.weekId = +paramMap.get('weekId');

      //get all UserMissions and calculate week progress
      this.fetchMissions() 
      
      let today = new Date();
      today.setHours(0,0,0,0);
      
    
     
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

  fetchMissions(){
    this.service.fetchMissions(this.kidId)
      .subscribe ( userMissions => {
        this.userMissions = userMissions;
        this.weekProgress=this.service.getOneWeekProgress(this.userMissions, this.weekId)
    })
  }

}
