import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MissionsService } from '../missions/missions.service';

@Component({
  selector: 'progress-history',
  template: `
    <ul>
      <li *ngFor="let week of weekHistory"
          [routerLink]="['../',week.weekId]">
      Tydzień numer: {{week.weekId}}
      Łącznie: {{week.nAll}} misji
      Wykonano: {{week.nDone}} misji
      Oczekuje: {{week.nWait}} misji
      Do zrobienia: {{week.nAll - week.nDone - week.nWait}} misji
      </li>
    </ul>
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
