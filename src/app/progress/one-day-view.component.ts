import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'one-day-view',
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
    <li *ngFor="let mission of waitMissions"
    (click)="addDone(mission)"> 
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
export class OneDayViewComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
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

  kid = {};
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
      this.kid['id'] = paramMap.get('kidId');
    })
    //fetch all Missions
    this.fetchMissions();
  }

  ngOnInit() {

  }

  fetchMissions() {
    this.http.get('http://localhost:3000/kids/' + this.kid['id'] + '/userMissions')
      .subscribe(userMissions => {
        this.userMissions = this.getAllMissions(userMissions, this.thisDay);
        this.doneMissions = this.getDoneMissions(this.userMissions, this.thisDay);
        this.waitMissions = this.getWaitMissions(this.userMissions, this.thisDay);
        this.undoneMissions = this.getUndoneMissions();
        this.countAll();
      })
  }


  //get from database ALL missions 
  getAllMissions = function (missions, day) {
    let dayAllMissions = [];
    for (let mission of missions) {
      //if Mission is started
      let startDate = new Date(mission.start)
      if (day >= startDate) {
        // if Mission is not finished
        if (mission.finish == null || day < mission.finish) {
          if (mission.days.indexOf(day.getUTCDay()) !== -1) {
            dayAllMissions.push(mission)
          }
        }
      }
    }
    return dayAllMissions;
  }

  //get from database all missions DONE this DAY
  getDoneMissions = function (missions, day) {
    let doneMissions = [];
    for (let mission of missions) {   
        if (mission['doneDates'].indexOf(day.getTime())>-1){
          doneMissions.push(mission)
        }
    }
    return doneMissions;
  }

  //get from database all missions WAIT this DAY
  getWaitMissions = function (missions, day) {
    let waitMissions = [];
    for (let mission of missions) {   
        if (mission['waitDates'].indexOf(day.getTime())>-1){
          waitMissions.push(mission)
        }
    }
    return waitMissions;
  }

  //get from database all missions UNDONE this DAY
  getUndoneMissions = function () {
    //remove from All missions WAIT and DONE
    let arrayWait = this.waitMissions.map(elem => elem.id);
    let arrayDone = this.doneMissions.map(elem => elem.id);
    let toRemove = new Set(arrayWait.concat(arrayDone))
    let dayUndoneMissions = this.userMissions.filter(obj => !toRemove.has(obj.id));
    return dayUndoneMissions;
  }



  addDone(mission) {
    let data=this.thisDay.getTime()
    let updatedMission={};
    this.http.get('http://localhost:3000/userMissions/' + mission.id)
      .subscribe(userMission => {
        updatedMission = userMission;
        updatedMission['doneDates'].push(data);
        if (updatedMission['waitDates'].indexOf(data)>-1){
          let index = updatedMission['waitDates'].indexOf(data)
          updatedMission['waitDates'].splice(index,1)
        }  
        this.http.put('http://localhost:3000/userMissions/'+ mission.id, updatedMission)
          .subscribe(() => this.fetchMissions());
      })
  }

 
  addWait(mission) {
    let data=this.thisDay.getTime()
    let updatedMission={};
    this.http.get('http://localhost:3000/userMissions/' + mission.id)
      .subscribe(userMission => {
        updatedMission = userMission;
        updatedMission['waitDates'].push(data);
        this.http.put('http://localhost:3000/userMissions/'+ mission.id, updatedMission)
          .subscribe(() => this.fetchMissions());
      })
  }

}
