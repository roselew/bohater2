import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'progress-bar-week',
  template: `
    <div class="progress"> 
      <div class="progress-undone"> </div>
      <div class="progress-wait" [ngStyle]="{'width' : waitWidth + '%'}"> </div>
      <div class="progress-done" [ngStyle]="{ 'width' : doneWidth + '%'}" [ngClass]="{'complete': doneWidth == 100 }"> 
      
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['../../sass/progress-bar-week.scss']
})
export class ProgressBarWeekComponent implements OnInit {

    constructor() { }

    @Input() waitWidth

    @Input() doneWidth

    ngOnInit() {}   
  
}
