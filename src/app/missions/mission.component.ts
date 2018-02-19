import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { MissionsService } from "../services/missions.service";

@Component({
  selector: 'mission',
  template: `
  <div class="edit">
    <span class="X" routerLink='../'> X </span>
    <view-mission [mission]="mission" [days]="days"></view-mission>
    <button (click)="update()">Zapisz zmiany</button>
    <button class="altButton" (click)="finish()">Wyłącz misję</button>
  </div>
  `,
  styles: [],

})
export class MissionComponent implements OnInit {

  constructor(
    private service: MissionsService,
    private router: Router,
    private route:ActivatedRoute,  
  ) { }

  mission = {};
  mission2={};

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

  missionId

  ngOnInit(){
    this.missionId = this.route.snapshot.paramMap.get('missionId');

    this.service.getOneMission(this.missionId)
      .subscribe( mission => {
        this.mission = mission;

        for (let day of this.mission['days']) {
          this.days.map(opt => {if (opt.value===day){opt.checked=true}})
        }
        } )
  }

  update(){


    let today = new Date()
    today.setHours(0,0,0,0);

    this.mission['days']=this.selectedDays;

    //misja była stworzona dziś i nie ma sensu jej zakańczać
    if (this.mission['start']==today.getTime()){
        this.service.updateOneMission(this.mission,this.missionId)
        .subscribe( mission => {
          this.mission=mission;
          this.router.navigate(['../'],{relativeTo:this.route})
        })        
    } else {
    //misja była stworzona wcześniej więc trzeba ją zakończyć i utworzyć nową
      this.mission['start']=today.getTime();
      
      this.mission['doneDates']=[];
      this.mission['waitDates']=[];

      this.service.createOneMission(this.mission) 
      .then( ()=> {
        this.service.finishOneMission(this.missionId)
        this.router.navigate(['../'],{relativeTo:this.route})
      })
    }
  }

   remove(){
     this.service.deleteOneMission(this.missionId)
       .subscribe( ()=> this.router.navigate(['../'],{relativeTo:this.route}))
   }

   finish(){
    this.service.finishOneMission(this.missionId)
    .then( ()=> this.router.navigate(['../'],{relativeTo:this.route}))
   }
   
}
