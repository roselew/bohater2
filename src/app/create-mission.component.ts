import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Location} from "@angular/common";


@Component({
  selector: 'create-mission',
  template: `

   <label>Name</label>
   <input [(ngModel)]="mission.name">
   <button (click)="save()">Save</button>
   <button (click)="goBack()">Powrót</button>
  `,
  styles: [],

})
export class CreateMissionComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
    private route:ActivatedRoute,
    private location:Location,
    ) { }

  kid = {}
  mission={};
  

  save(){
  this.mission['kidId']=this.kid['id'];
  this.http.post('http://localhost:3000/userMissions/', this.mission)
    .subscribe( mission=> {this.mission= mission; this.goBack(); this.goBack();});
  }

  ngOnInit() {
    this.kid['id']=this.route.snapshot.paramMap.get('kidId');
  }

  goBack(){
     this.location.back();
   }
}
