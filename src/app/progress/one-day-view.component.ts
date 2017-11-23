import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { MissionsService } from '../missions/missions.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'one-day-view',
  template: `
  <div class="day"> <p> {{days[thisDay.getUTCDay()]}} <span></span> </p>
  
  <div class="day-line">
    <ul class="small-mission-undone">
      <li *ngFor="let mission of undoneMissions"
      class='circle-small'>
      </li> 
     </ul>	
    <ul class="small-mission-wait">
      <li *ngFor="let mission of waitMissions"
      class='circle-small'>
      </li> 
     </ul>		
    <ul class="small-mission-done">
      <li *ngFor="let mission of doneMissions"
      class='circle-small'>
      </li> 
    </ul>		
  </div>

  <div class="day-details" >
    <ul class="mission-undone"> 
      <li *ngFor="let mission of undoneMissions"
      class='circle-mid'
      (click)="addDone(mission)"> 
        <img src="{{mission.icon}}">
        <star-svg></star-svg>
        <span>{{mission.points}}</span>
      </li> 
    </ul>			
    <ul class="mission-wait"> 
      <li *ngFor="let mission of waitMissions"
      class='circle-mid' 
      (click)="addDone(mission)">> 
        <img src="{{mission.icon}}">
        <star-svg></star-svg>
        {{starSvg}}
        <span>{{mission.points}}</span>
      </li> 
    </ul>	
    <ul class="mission-done"> 
      <li *ngFor="let mission of doneMissions"
      class='circle-mid'> 
        <img src="{{mission.icon}}">
        <star-svg></star-svg>
        <span>{{mission.points}}</span>
      </li> 
    </ul>	
  </div>		
</div>

  `,
  styles: [`
 
    table {
      width: 100%;
    }

    td, th {
      width: 25%;
    }
  `],

})
export class OneDayViewComponent implements OnInit {

  constructor(
    private service: MissionsService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }


  @Input()
  dayId

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
  monthNames = ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"];


  ngOnChanges(){
    //set thisDay 
    this.thisDay = new Date();
    this.thisDay.setDate(this.thisDay.getDate() + this.dayId);
    this.thisDay.setHours(0, 0, 0, 0);
    //get kid Id 
    this.route.parent.paramMap.subscribe(paramMap => {
      this.kidId = paramMap.get('kidId');
    })
      this.fetchMissions()
  }

  ngOnInit() {  }

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
