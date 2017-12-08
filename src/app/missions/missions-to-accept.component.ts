import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'missions-to-accept',
  template: `
    <img *ngIf="totalToAccept>0" src="../../assets/mission.svg" class="enlarge">
    <img *ngIf="totalToAccept==0" src="../../assets/mission_empty.svg" class="enlarge">
    <p> {{totalToAccept}} misje do akceptacji </p>
  `,
  styles: [],
})

export class MissionsToAcceptComponent implements OnInit {

  constructor() {}

  @Input()
  userMissions 
  
  totalToAccept

  ngOnInit() {
     this.totalToAccept = this.userMissions.map(x=>x['waitDates'].length).reduce((a, b) => a + b, 0);
  }
 
}
