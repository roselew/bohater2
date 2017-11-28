import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MissionsService } from '../missions/missions.service';

@Component({
  selector: 'progress-history',
  template: `
  
  
  <div *ngFor="let week of weekHistory"
        [routerLink]="['../',week.weekId]">
        
      <p>Tydzień numer: {{showWeekName(week)}} </p>
      
      <progress-bar-week 
        [waitWidth]="100*(week.nDone+week.nWait)/week.nAll" 
        [doneWidth]="100*week.nDone/week.nAll">
      </progress-bar-week>
  
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
   let dayId=week.id*7-today.getUTCDay() 
   let startDate=today.getDate()+dayId
   let endDate = startDate.geDate()+6
   if (startDate.getMonth()==endDate.getMonth()){
     return [startDate.getDay(), ' - ', endDate.getDay(), monthNames[endDate.getMonth()]]
   } else {
     return [startDate.getDay(), monthNames[firstDate.getMonth()], ' - ', endDate.getDay(), monthNames[endDate.getMonth()]]
   }
  }
  
  
  ngOnInit() {
    this.kid['id']=this.route.parent.snapshot.paramMap.get('kidId');
    this.http.get('http://localhost:3000/kids/' + this.kid['id'] + '?_embed=userMissions')
      .subscribe(kid => {
        this.kid = kid;
        this.userMissions = this.kid['userMissions'];
        this.weekHistory = this.service.getAllWeeksProgress(this.userMissions)
        })
  }
}
