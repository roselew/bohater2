import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MissionsService } from '../missions/missions.service';

@Component({
  selector: 'progress-history',
  template: `
  <p style="margin: 2rem auto">Historia postepow tygodniowych </p>
  <br>
  
  <div *ngFor="let week of weekHistory"
        [routerLink]="['../',week.weekId]">
        
      <p> {{showWeekName(week)}} </p>
      
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
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private service: MissionsService,
  ) { }

  kid = {}
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
    this.kid['id']=this.route.parent.snapshot.paramMap.get('kidId') || localStorage.getItem('loggedKid');
    this.http.get('http://localhost:3000/kids/' + this.kid['id'] + '?_embed=userMissions')
      .subscribe(kid => {
        this.kid = kid;
        this.userMissions = this.kid['userMissions'];
        this.weekHistory = this.service.getAllWeeksProgress(this.userMissions)
        })
  }
}
