import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'progress-week',
  template: `
    <p>
      Postęp w tym tygodniu
    </p>
    <ul>
      <li> Razem {{thisWeekTotal}} </li>
      <li> Do zaakcptowania {{thisWeekToAccept}} </li>
      <li> Wykonano {{thisWeekDone}} </li>
    </ul>
  `,
  styles: [],
})
export class ProgressWeekComponent implements OnInit {

  constructor() { }

  @Input()
  userMissions 
  
  thisWeekTotal = 0;
  thisWeekToAccept = 0;
  thisWeekDone = 0;

  ngOnInit() {
    let today = new Date();
    today.setHours(0,0,0,0);
    let firstDay = 0 - today.getUTCDay();
    for (let i = firstDay; i < firstDay+7; i ++){
      let day= new Date(today);
      day.setDate(day.getDate()+i);
      let dayNumber = day.getTime();

      this.thisWeekTotal += this.getAllMissions(this.userMissions,dayNumber).length;
      this.thisWeekToAccept += this.getWaitMissions(this.userMissions,dayNumber).length;
      this.thisWeekDone += this.getDoneMissions(this.userMissions,dayNumber).length;
    }   
   
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
          if (mission.days.indexOf(new Date(day).getUTCDay()) !== -1) {
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
        if (mission['doneDates'].indexOf(day)>-1){
          doneMissions.push(mission)
        }
    }
    return doneMissions;
  }

  //get from database all missions WAIT this DAY
  getWaitMissions = function (missions, day) {
    let waitMissions = [];
    for (let mission of missions) {   
        if (mission['waitDates'].indexOf(day)>-1){
          waitMissions.push(mission)
        }
    }
    return waitMissions;
  }


}
