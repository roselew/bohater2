import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Location} from "@angular/common";

@Component({
  selector: 'one-day',
  template: `
    <p>
      one-day works!
    </p>
  `,
  styles: [],

})
export class OneDayComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
    private route:ActivatedRoute,
    private location:Location,
    
  ) { }

  kid = {};
  userMissions = {};
  doneMission = {};
  waitMission = {};
  dayId

  ngOnInit(){
    this.dayId=this.route.snapshot.paramMap.get('dayId');

    this.kid['id']=this.route.snapshot.paramMap.get('kidId');

    //get all user Missions
    this.http.get('http://localhost:3000/kids/'+this.kid['id']+'/userMissions')
      .subscribe( userMissions => this.userMissions = userMissions );


  // addDone(){
  //   this.doneMission['doneDate']= new Date();
  //   this.doneMission['missionId']=this.mission['id'];
  //   this.http.post('http://localhost:3000/doneMissions/', this.doneMission)
  //     .subscribe( );
  // }

  // addWait(){
  //   this.waitMission['doneDate']= new Date();
  //   this.waitMission['missionId']=this.mission['id'];
  //   this.http.post('http://localhost:3000/waitMissions/', this.waitMission)
  //     .subscribe( );
  // 
  }

  goBack(){
    this.location.back();
  }

}
