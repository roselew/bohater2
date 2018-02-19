import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'missions-to-accept',
  template: `
    <img *ngIf="totalToAccept>0" src="../../assets/mission.svg" class="enlarge">
    <img *ngIf="totalToAccept==0" src="../../assets/mission_empty.svg" class="enlarge">
    <p> Misje do akceptacji </p>
    <star-svg><span>0</span></star-svg>
    <span>{{totalToAccept}}</span>
  `,
  styles: [],
})

export class MissionsToAcceptComponent implements OnInit {

  constructor() {}

  @Input()
  userMissions 
  
  totalToAccept

  ngOnInit() {}
  ngOnChanges(){
     this.totalToAccept = this.userMissions.map(x=>x['waitDates'].length).reduce((a, b) => a + b, 0);
  }
 
}
