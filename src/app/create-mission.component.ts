import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Location} from "@angular/common";


@Component({
  selector: 'create-mission',
  template: `

   <label>Name</label>
   <input [(ngModel)]="mission.name">
   <label>Points</label>
   <input [(ngModel)]="mission.points">
   <label>Icon</label>
   <input [(ngModel)]="mission.icon">

   <div class="form-group">
   <label for="days">Days:</label>
   <div *ngFor="let day of days">
       <label>
           <input type="checkbox"
                   name="days"
                   value="{{day.value}}"
                   [(ngModel)]="day.checked"/>
           {{day.name}}
       </label>
   </div>
 </div>

   <label>
   <input type="checkbox" 
          [(ngModel)]="mission.confirmation">
   Confirmation</label>
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
  days=[
    {name: 'PN', value: 0, checked: false},
    {name: 'WT', value: 1, checked: false},
    {name: 'ŚR', value: 2, checked: false},
    {name: 'CZ', value: 3, checked: false},
    {name: 'PT', value: 4, checked: false},
    {name: 'SB', value: 5, checked: false},
    {name: 'ND', value: 6, checked: false}
  ];

  get selectedDays() { 
    return this.days
              .filter(opt => opt.checked)
              .map(opt => opt.value)
    }


  save(){
  this.mission['kidId']=this.kid['id'];
  this.mission['start']=new Date;
  this.mission['start'].setHours(0,0,0,0);
  this.mission['days']=this.selectedDays;
  this.http.post('http://localhost:3000/userMissions/', this.mission)
    .subscribe( mission=> {this.mission= mission; this.goBack(); this.goBack();});
  }

  ngOnInit() {
    this.kid['id']=this.route.snapshot.paramMap.get('kidId');
    this.mission['confirmation']=true;
  }

  goBack(){
     this.location.back();
   }
}
