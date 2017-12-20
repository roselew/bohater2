import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MissionsService } from '../services/missions.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'progress-history',
  template: `
  <p style="margin: 2rem auto">Historia postepow tygodniowych </p>
  <br>
  
  <div *ngFor="let week of weekHistory"
        [routerLink]="['../',week.weekId]">
        
      <p style="font-size: 3.5rem"> {{showWeekName(week)}} </p>
      
      <progress-bar-week 
        [waitWidth]="100*(week.nDone+week.nWait)/week.nAll" 
        [doneWidth]="100*week.nDone/week.nAll">
        <p> {{week.nDone}} / {{week.nAll}} </p>
      </progress-bar-week>
      <br>
  </div>

  `,
  styles: [],

})
export class ProgressHistoryComponent implements OnInit {

  constructor(
    private users: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private service: MissionsService,
  ) { }

  userMissions
  userHero
  weekHistory

  showWeekName(week){
   let monthNames = ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"];
   let today = new Date()
   today.setHours(0,0,0,0)
   let dayId=week.weekId*7-today.getUTCDay() 
   let startDate=new Date(today)
   startDate.setDate(startDate.getDate()+dayId)
   let endDate = new Date(startDate)
   endDate.setDate(endDate.getDate()+6)
   if (startDate.getMonth()==endDate.getMonth()){
     return [startDate.getDate() + ' - ' + endDate.getDate() + " " +monthNames[endDate.getMonth()]]
   } else {
     return [startDate.getDate() + " "+ monthNames[startDate.getMonth()] + ' - '+ endDate.getDate()+" " + monthNames[endDate.getMonth()]]
   }
  }
 

  ngOnInit() {
    let kidId = this.route.parent.snapshot.paramMap.get('kidId') || this.users.getLoggedUser('kid');
    this.service.fetchMissions(kidId)
      .subscribe(userMissions => {
        this.userMissions = userMissions;
        this.weekHistory = this.service.getAllWeeksProgress(this.userMissions)
        })
  }
}
