import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'move-mission',
  template: `
  <div class="alert">
    <span class="X" (click)="selectedMission=null"> X </span>

    <ul class="mission-undone">
      <li class="circle-big">
        <p>
        {{selectedMission.name}}
        </p>
        <img src="{{selectedMission.icon}}">
        <star-svg></star-svg>
        <span>{{selectedMission.points}}</span>
    
        <div class="thumb thumb-down" (click)="moveUp(selectedMission,missionStatus)"><img src="assets/dislike.svg"></div>    
        <div class="thumb thumb-up" (click)="moveDown(selectedMission,missionStatus)"><img src="assets/like.svg"></div>     
      </li>
    </ul>
    
  </div>
  `,
  styles: [],

})
export class MoveMissionComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
    private route:ActivatedRoute,  
  ) { }

  ngOnInit() {
  }

  @Input() selectedMission

  @Input() missionStatus

}
