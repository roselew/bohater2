import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { MissionsService } from "../services/missions.service"
import { UsersService } from "../services/users.service"
import { ExpertsService } from '../services/experts.service';

@Component({
  selector: 'one-week',
  template: `

  
  <p *ngIf="userMissions && userMissions.length==0 && mode=='parent'" class="smallTitle"> 
    Nie ma żadnych postępów, bo nie dodałeś jeszcze żadnych misji do wykonania. <br>
    Wybierz przycisk <img src="assets/menu-button.svg" width="20px"> w prawym górnym rogu, a następnie MISJE. 
  </p>

  <p *ngIf="userMissions && userMissions.length==0 && mode=='kid'" class="smallTitle"> 
    Poproś rodzica o dodanie misji do wykonania. 
  </p>
  
  <div class="week" *ngIf="firstDate && userMissions && userMissions.length>0"> 
    <span [routerLink]="['../',weekId -1]" class="prev">&lsaquo;</span>
    <a routerLink='../historia'>{{firstDate.getDate()}} {{firstDate.getMonth()==endDate.getMonth() ? '' : monthNames[firstDate.getMonth()]}} - {{endDate.getDate()}} {{monthNames[endDate.getMonth()]}}</a>
    <span [routerLink]="['../',weekId +1]" class="next">&rsaquo;</span> 
  </div>		
  
  <progress-bar-week *ngIf="weekProgress && userMissions && userMissions.length>0"
    [waitWidth]="100*(weekProgress.nWait+weekProgress.nDone)/weekProgress.nAll" 
    [doneWidth]="100*weekProgress.nDone/weekProgress.nAll">
  </progress-bar-week>
 
    <div class="filter" *ngIf="weekProgress && userMissions && userMissions.length>0">
      <button class="show-all" (click)="applyFilter('all')" [ngClass]="{'selected': (filter=='all')}"><span>{{weekProgress.nAll}}</span>
        </button><button class="show-undone" (click)="applyFilter('undone')" [ngClass]="{'selected': (filter=='undone')}"><span>{{weekProgress.nAll-weekProgress.nWait-weekProgress.nDone}}</span>
        </button><button class ="show-wait" (click)="applyFilter('wait')" [ngClass]="{'selected': (filter=='wait')}"><span>{{weekProgress.nWait}}</span>
        </button><button class="show-done" (click)="applyFilter('done')" [ngClass]="{'selected': (filter=='done')}"><span>{{weekProgress.nDone}}</span>
      </button>
      <img *ngIf="heroImage" src="{{heroImage}}" class="hero">
    </div>

   <div *ngFor="let day of days">
    <one-day-view *ngIf="userMissions && userMissions.length>0 && heroImage"
        (onChange)="fetchMissions()" 
        [mode]="mode" 
        [type]="type"
        [filter]="filter"
        [dayId]="day"
        [heroImage]="heroImage"
        [userMissions]="userMissions">
    </one-day-view>
  </div>


  
  `,
  styles: [],

})
export class OneWeekComponent implements OnInit {

  constructor(
    private experts: ExpertsService,
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
  heroImage

  applyFilter(filterMode){
    this.filter=filterMode
  }

  ngOnInit() { 

    //get kid Id
    if (this.mode=='kid'){
      this.kidId = this.users.getLoggedUser('kid');
    } else {
      this.kidId = this.route.parent.snapshot.paramMap.get('kidId');
    }
  
    //get all UserMissions and calculate week progress
    this.service.fetchMissions(this.kidId)
      .subscribe ( userMissions => {
      this.userMissions = userMissions;

      //get week Id 
      this.route.paramMap.subscribe(paramMap => {

        this.weekId = +paramMap.get('weekId');

        this.weekProgress=this.service.getOneWeekProgress(this.userMissions, this.weekId)

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

        this.users.getOneKid(this.kidId)
          .subscribe ( kid => this.heroImage = this.experts.getHeroImage(kid['heroId']))
      })
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
