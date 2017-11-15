import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'shortcut-kid',
  template: `
    <p> Na skróty: </p>
    <ul *ngIf="userMissions && userGifts">
      <li 
        [routerLink]="['/kids/'+kidId+'/one-week/0']"> 
        <missions-to-accept [userMissions]="userMissions"></missions-to-accept> 
      </li>
      <li 
        [routerLink]="['/kids/'+kidId+'/gifts']"> 
        <gifts-to-receive [userGifts]="userGifts"></gifts-to-receive> 
      </li>
      <li 
        [routerLink]="['/kids/'+kidId+'/one-week/0']"> 
        <progress-week [userMissions]="userMissions"></progress-week> 
      </li>
      <br>
      <li 
        [routerLink]="['/kids/'+kidId+'/missions/new-mission']"> 
        Dodaj nową misję 
      </li>
      <br>
      <li> 
        Dodaj ekstra punkty - jeszcze nie działa 
      </li>
    </ul>
  `,
  styles: [],

})
export class ShortcutKidComponent implements OnInit {

  constructor(
    private http: HttpClient
  ) { }

  @Input()
  kidId 
  
  userMissions
  userGifts

  ngOnInit() {
    this.http.get('http://localhost:3000/kids/' + this.kidId + '/userMissions')
    .subscribe(userMissions => this.userMissions = userMissions)

    this.http.get('http://localhost:3000/kids/' + this.kidId + '/userGifts')
    .subscribe(userGifts => this.userGifts = userGifts)
  }

}
