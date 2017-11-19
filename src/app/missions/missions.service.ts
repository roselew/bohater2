import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MissionsService {

   constructor(   
    private http: HttpClient
  ) { }

  userMissions = [];
  doneMissions = [];
  waitMissions = [];
  undoneMissions = [];

  fetchMissions(kidId) {
    return this.http.get('http://localhost:3000/kids/' + kidId + '/userMissions')
  }

  getOneMission(missionId){
    return this.http.get('http://localhost:3000/userMissions/' + missionId)
  }

  updateOneMission(missionId, mission){
    return this.http.put('http://localhost:3000/userMissions/'+ missionId, mission)
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
  getUndoneMissions = function (userMissions, waitMissions, doneMissions) {
    //remove from All missions WAIT and DONE
    let arrayWait = waitMissions.map(elem => elem.id);
    let arrayDone = doneMissions.map(elem => elem.id);
    let toRemove = new Set(arrayWait.concat(arrayDone))
    let dayUndoneMissions = userMissions.filter(obj => !toRemove.has(obj.id));
    return dayUndoneMissions;
  }

}
