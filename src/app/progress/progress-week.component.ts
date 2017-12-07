import { Component, OnInit, Input} from '@angular/core';
import { MissionsService } from '../missions/missions.service';

@Component({
  selector: 'progress-week',
  template: `
  
  
  <div *ngIf="weekProgress">
        
      <progress-bar-week 
        [waitWidth]="100*(weekProgress.nDone+weekProgress.nWait)/weekProgress.nAll" 
        [doneWidth]="100*weekProgress.nDone/weekProgress.nAll">
        <p> {{weekProgress.nDone}} / {{weekProgress.nAll}}</p>
      </progress-bar-week>
  
  </div>
  
  `,
  styles: [],

})
export class ProgressWeekComponent implements OnInit {

  constructor(
    private service: MissionsService,
  ) { }

 @Input() userMissions

  weekProgress

  ngOnInit() {
      this.weekProgress = this.service.getOneWeekProgress(this.userMissions,0)
  }
  
}
