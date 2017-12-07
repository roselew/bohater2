import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { MissionsService } from "./missions.service";

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

  ngOnInit(){
    let missionId = +this.route.snapshot.paramMap.get('missionId');

    this.service.getOneMission(missionId)
      .subscribe( mission => {
        this.mission = mission;
        for (let day of this.mission['days']) {
          this.days.map(opt => {if (opt.value===day){opt.checked=true}})
        }
        } )
  }

   update(){
    this.mission['days']=this.selectedDays;

    this.service.updateOneMission(this.mission)
      .subscribe( mission=> {
        this.mission= mission; 
        this.router.navigate(['../'],{relativeTo:this.route});
      })
   }

   remove(){
     this.service.deleteOneMission(this.mission['id'])
       .subscribe( ()=> this.router.navigate(['../'],{relativeTo:this.route}))
   }

   finish(){
     let today = new Date().setHours(0,0,0,0);
     this.mission['finish']=today;

    this.service.updateOneMission(this.mission)
     .subscribe( mission=> {
       this.mission= mission; 
       this.router.navigate(['../'],{relativeTo:this.route});
     })

   }
   
}
