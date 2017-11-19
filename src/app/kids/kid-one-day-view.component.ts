import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { MissionsService } from '../missions/missions.service';

@Component({
  selector: 'kid-one-day-view',
  template: `
  <p>{{thisDay.getDate()}} {{monthNames[thisDay.getMonth()]}}</p>
  <table>
  <tr>
    <th>Wszystkie</th>
    <th>Zrobione</th>
    <th>Oczekujące</th>
    <th>Niezrobione</th>  
  </tr>
  <tr>
  <td>
    <ul> 
    <li *ngFor="let mission of userMissions"> 
      {{mission.name}}     
    </li> 
    </ul>
  </td>
  <td>
    <ul> 
    <li *ngFor="let mission of doneMissions"> 
      {{mission.name}}     
    </li> 
    </ul>
  </td>
  <td>
    <ul> 
    <li *ngFor="let mission of waitMissions"> 
      {{mission.name}}     
    </li> 
    </ul>
  </td>
  <td>
    <ul> 
    <li *ngFor="let mission of undoneMissions"
    (click)="addWait(mission)"> 
      {{mission.name}}     
    </li> 
    </ul>
  </td>
  </tr>
  </table>

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
export class KidOneDayViewComponent implements OnInit {

  constructor(
    private service: MissionsService,
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
    this.kidId = +localStorage.getItem('loggedKid');
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
