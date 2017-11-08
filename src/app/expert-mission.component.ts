import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Location} from "@angular/common";

@Component({
  selector: 'expert-mission',
  template: `
      <label>Name</label>
      <input [(ngModel)]="mission.name">
      <button (click)="save()">Zapisz</button>
      <button (click)="goBack()">Powrót do listy</button>
  `,
  styles: [],

})
export class ExpertMissionComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
    private route:ActivatedRoute,
    private location:Location,
    
  ) { }

  kid = {}
  mission={};

   ngOnInit(){
      let id=this.route.snapshot.paramMap.get('missionId');
      this.kid['id']=this.route.snapshot.paramMap.get('kidId');
      this.http.get('http://localhost:3000/expertMissions/'+id)
        .subscribe( mission => this.mission['name'] = mission['name'] )
   }

    save(){
      this.mission['kidId']=this.kid['id'];
      this.http.post('http://localhost:3000/userMissions/', this.mission)
        .subscribe( mission=> {this.mission= mission; this.goBack(); this.goBack();});
    }

   goBack(){
     this.location.back();
   }

}
