import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { MissionsService } from '../missions/missions.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'one-day-view',
  template: `



  <div class="day" *ngIf="(type=='weekView')"> 
  
      <p> {{days[thisDay.getUTCDay()]}} <span></span> </p>

      <div *ngIf=(filter=='all') class="day-line">
        <ul class="small-mission-undone">
          <li *ngFor="let mission of undoneMissions" class='circle-small'></li> 
        </ul>	
        <ul class="small-mission-wait">
          <li *ngFor="let mission of waitMissions" class='circle-small'></li> 
         </ul>		
        <ul class="small-mission-done">
          <li *ngFor="let mission of doneMissions" class='circle-small'></li> 
        </ul>		
      </div>

      <div class="day-details" >
        <ul *ngIf=(filter=='all'||filter='undone') class="mission-undone"> 
          <li *ngFor="let mission of undoneMissions" 
            class='circle-mid'
            (click)="moveUndone(mission)"> 
            <img src="{{mission.icon}}">
            <star-svg></star-svg>
            <span>{{mission.points}}</span>
          </li> 
        </ul>			
        <ul *ngIf=(filter=='all'||filter='wait') class="mission-wait"> 
          <li *ngFor="let mission of waitMissions"
            class='circle-mid'
            (click)="moveWait(mission)"> 
            <img src="{{mission.icon}}">
            <star-svg></star-svg>
            <span>{{mission.points}}</span>
          </li> 
        </ul>	
        <ul *ngIf=(filter=='all'||filter='done') class="mission-done"> 
          <li *ngFor="let mission of doneMissions"
            class='circle-mid'
            (click)="moveDone(mission)"> 
            <img src="{{mission.icon}}">
            <star-svg></star-svg>
            <span>{{mission.points}}</span>
          </li> 
        </ul>	
      </div>		
      
   </div>



  <div class="day-view" *ngIf="(type=='dayView')">
  
      <div class = 'left-column'>
        <p class = "title">DO ZROBIENIA</p>
        
        <ul class="mission-undone"> 
          <li *ngFor="let mission of undoneMissions"
            class='circle-big'
            (click)="moveUndone(mission)"> 
            <img src="{{mission.icon}}">
            <star-svg></star-svg>
            <span>{{mission.points}}</span>
          </li> 
        </ul>	
        
      </div>
      
      <div class="right-column">
        <p class = "title">ZROBIONE</p>
        
        <ul class="mission-wait"> 
          <li *ngFor="let mission of waitMissions"
            class='circle-big'
            (click)="moveWait(mission)">
            <img src="{{mission.icon}}">
            <star-svg></star-svg>
            <span>{{mission.points}}</span>
          </li> 
        </ul>	
        <ul class="mission-done"> 
          <li *ngFor="let mission of doneMissions"
            class='circle-big'
            (click)="moveDone(mission)">
            <img src="{{mission.icon}}">
            <star-svg></star-svg>
            <span>{{mission.points}}</span>
          </li> 
        </ul>	
        
      </div>
      
  </div>	


  `,
  styleUrls: ['../../sass/one-day-view.scss']

})
export class OneDayViewComponent implements OnInit {

   
  constructor(
    private service: MissionsService,
    private router: Router,
    private route:ActivatedRoute,
  ) { }

  days = ['PN','WT','ŚR','CZ','PT','SB','ND']

  @Input() dayId
  
  @Input() mode
  
  @Input() type
  
  @Input() filter

  @Output('onChange')
  countMissions = new EventEmitter();

  countAll() {
    let nDone = this.doneMissions.length;
    let nWait = this.waitMissions.length;
    let nUndone = this.undoneMissions.length;

    this.countMissions.emit([nDone, nWait, nUndone])
  }

  kidId;
  thisDay;
  userMissions = [];
  doneMissions = [];
  waitMissions = [];
  undoneMissions = [];

  ngOnChanges(){
    //set thisDay 
    this.thisDay = new Date();
    this.thisDay.setDate(this.thisDay.getDate() + this.dayId);
    this.thisDay.setHours(0, 0, 0, 0);
    if (this.mode=='kid'){
      this.kidId = +localStorage.getItem('loggedKid');
    } else {
      this.kidId = this.route.parent.snapshot.paramMap.get('kidId');
    }

    //fetch all Missions
    this.fetchMissions();
  }

  ngOnInit() { }

  fetchMissions() {
    this.service.fetchMissions(this.kidId)
      .subscribe(userMissions => {
        this.userMissions = this.service.getAllMissions(userMissions,this.thisDay);
        this.waitMissions = this.service.getWaitMissions(this.userMissions,this.thisDay);
        this.doneMissions = this.service.getDoneMissions(this.userMissions,this.thisDay);
        this.undoneMissions = this.service.getUndoneMissions(this.userMissions, this.waitMissions, this.doneMissions);
        this.countAll();
      })
  }

 moveUndone(mission) {
    if (this.mode == 'parent'){
        this.addDone(mission)
    } else {
        this.addWait(mission)
    }
  }
  
 moveWait(mission) {
    if (this.mode == 'parent'){
        this.addDone(mission)
    } else {
        
    }
  }
  
 moveDone(mission) {
    if (this.mode == 'parent'){
       
    } else {
        
    }
  }
  
  addDone(mission) {
    let data=this.thisDay.getTime()
    let updatedMission={};
    this.service.getOneMission(mission.id)
      .subscribe(userMission => {
        updatedMission = userMission;
        updatedMission['doneDates'].push(data);
        if (updatedMission['waitDates'].indexOf(data)>-1){
          let index = updatedMission['waitDates'].indexOf(data)
          updatedMission['waitDates'].splice(index,1)
        }  
        this.service.updateOneMission(mission.id,updatedMission)
          .subscribe(() => this.fetchMissions());
      })
  }

 
  addWait(mission) {
    if (!mission.confirmation){
      this.addDone(mission)
    } else {
    let data=this.thisDay.getTime()
    let updatedMission={};
    this.service.getOneMission(mission.id)
      .subscribe(userMission => {
        updatedMission = userMission;
        updatedMission['waitDates'].push(data);
        this.service.updateOneMission(mission.id,updatedMission)
          .subscribe(() => this.fetchMissions());
      })
    }
  }

}
