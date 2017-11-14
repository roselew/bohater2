import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'view-mission',
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
  `,
  styles: [],

})
export class ViewMissionComponent implements OnInit {

  @Input() mission
  @Input() days

  constructor() { }

  ngOnInit() {
  }

}
