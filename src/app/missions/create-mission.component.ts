import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Location} from "@angular/common";


@Component({
  selector: 'create-mission',
  template: `
   <view-mission [mission]="mission" [days]="days"></view-mission>
   <br>
   <button (click)="save()">Save</button>
   <button routerLink='../'>Powrót</button>

  `,
  styles: [],

})
export class CreateMissionComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
    private route:ActivatedRoute,
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

  ngOnInit() {
    this.kid['id']=this.route.parent.snapshot.paramMap.get('kidId');
    this.mission['confirmation']=true;
  }

  save(){
    this.mission['kidId']=parseInt(this.kid['id']);
    let today = new Date().setHours(0,0,0,0);
    this.mission['start']=today;
    this.mission['days']=this.selectedDays;
    this.mission['doneDates']=[];
    this.mission['waitDates']=[];
    this.http.post('http://localhost:3000/userMissions/', this.mission)
      .subscribe( mission=> {
        this.mission= mission;
        this.router.navigate(['../'],{relativeTo:this.route});
      });
  }



}
