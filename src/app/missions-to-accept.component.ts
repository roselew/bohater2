import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'missions-to-accept',
  template: `
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
