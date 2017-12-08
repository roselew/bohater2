import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { MissionsService } from "./missions.service";
import { ExpertsService } from '../services/experts.service';

@Component({
  selector: 'expert-mission',
  template: `
  <div class="edit">
    <span class="X" routerLink='../../'> X </span>
    <view-mission [mission]="mission" [days]="days"></view-mission>
    <button (click)="save()">Dodaj misję</button>
  </div>
  `,
  styles: [],

})
export class ExpertMissionComponent implements OnInit {

  constructor(
    private experts: ExpertsService,
    private service: MissionsService,
    private router: Router,
    private route:ActivatedRoute,   
  ) { }

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

   ngOnInit(){
      let missionId=this.route.snapshot.paramMap.get('missionId');
      let expertMission = this.experts.getOneExpertMission(missionId);
      this.mission['name'] = expertMission['name'] 
      this.mission['icon'] = expertMission['icon']
      this.mission['confirmation']=true;
   }

    save(){
      let kidId = +this.route.parent.snapshot.paramMap.get('kidId');
      this.mission['kidId']=kidId;
      let today = new Date().setHours(0,0,0,0);
      this.mission['start']=today;
      this.mission['days']=this.selectedDays;
      this.mission['doneDates']=[];
      this.mission['waitDates']=[];
      this.service.createOneMission(this.mission)
        .subscribe( mission=> {
          this.mission= mission;
          this.router.navigate(['../../'],{relativeTo:this.route});
        });
    }

}
