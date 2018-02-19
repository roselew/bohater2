import { Injectable, Inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
// import * as moment from 'moment';

@Injectable()
export class MissionsService {

  userMissionsCollection: AngularFirestoreCollection<any>
  userMissions: Observable<any[]>
  userMissionDoc: AngularFirestoreDocument<any>
  userMission : Observable<any>

  constructor(private afs: AngularFirestore) { }


  doneMissions = [];
  waitMissions = [];
  undoneMissions = [];

  fetchMissions(kidId) {
    this.userMissionsCollection = this.afs.collection<any>('userMissions', ref => {
      // Compose a query using multiple .where() methods
      return ref
              .where('kidId', '==', kidId)
    });
    this.userMissions = this.userMissionsCollection.snapshotChanges().map(changes => {
      return changes.map( a => {
        const data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return data;
      })
    })
    return this.userMissions
  }



  getOneMission(missionId){
    this.userMissionDoc = this.afs.doc(`userMissions/${missionId}`)
    this.userMission = this.userMissionDoc.valueChanges()
    return this.userMission 
  }

  updateOneMission(mission,missionId){
    this.userMissionDoc = this.afs.doc(`userMissions/${missionId}`) 
    this.userMissionDoc.update(mission)  
    this.userMission=this.userMissionDoc.valueChanges()
    return this.userMission
  }

  deleteOneMission(mission){
    this.userMissionDoc = this.afs.doc(`userMissions/${mission.id}`)
    this.userMissionDoc.delete()
    return this.userMissions
  }

 createOneMission(mission){
  return this.userMissionsCollection.add(mission)
  }
  
  //dodatkowo bohater 
  getKidWithMissions(kidId){
    //return this.http.get(this.API_URL+ 'kids/' + kidId + '?_embed=userMissions')
  }

  updateHero(hero){
    //return this.http.put(this.API_URL+ 'userHeroes/'+ hero['id'], hero)
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
 
  
  getAllWeeksProgress(userMissions){
      if (userMissions.length==0){
        return [{weekId: 0, nAll:0, nWait:0, nUndone:0}]
      }

      let  weekProgress=[];

      let today = new Date();
      today.setHours(0,0,0,0);
      
      today.setDate(today.getDate() - today.getUTCDay())

      //finds the oldest mission - point where to start checking history 
      let firstMissionStart =new Date(userMissions.sort(function(a,b){
        return a['start']-b['start'];
      })[0].start)

      firstMissionStart.setDate(firstMissionStart.getDate() - firstMissionStart.getUTCDay())

      //calculate how many week before today's week we need to go back
      let firstWeekId = (firstMissionStart.getTime()-today.getTime())/(1000 * 3600 * 24)/ 7;

      for (let weekId=firstWeekId; weekId<1; weekId++){   
         weekProgress.push(this.getOneWeekProgress(userMissions,weekId))
      }

      return weekProgress

  }
  
  getOneWeekProgress(userMissions,weekId){
    let thisWeek={
      weekId: weekId,
      nAll: 0,
      nWait: 0,
      nDone: 0,
    }
    let today = new Date();
    today.setHours(0,0,0,0);
    
    for (let dayId=weekId*7-today.getUTCDay(); dayId<weekId*7+7-today.getUTCDay(); dayId++){
      
      let thisDay = new Date(today);
      thisDay.setDate(thisDay.getDate() + dayId)
      thisDay.setHours(0,0,0,0);
      let allMissions = this.getAllMissions(userMissions,thisDay);
      thisWeek.nAll += allMissions.length;
      thisWeek.nWait += this.getWaitMissions(allMissions,thisDay).length;
      thisWeek.nDone += this.getDoneMissions(allMissions,thisDay).length;
    }

    return thisWeek

  }

 
}
