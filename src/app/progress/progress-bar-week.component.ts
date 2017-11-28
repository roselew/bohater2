import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'progress-bar-week',
  template: `
    <div class="progress"> 
      <div class="progress-undone"> </div>
      <div class="progress-wait" [ngStyle]="{'width' : waitWidth + '%'}"> </div>
      <div class="progress-done" [ngStyle]="{ 'width' : doneWidth + '%'}"> </div> 
      <img src="../../assets/logo.png" class="logo">
    </div>
  `,
  styleUrls: ['../../sass/progress-bar-week.scss']
})
export class ProgressBarWeekComponent implements OnInit {

    constructor() { }

    @Input() waitWidth

    @Input() doneWidth

    ngOnInit() { console.log(this.waitWidth, this.doneWidth)}   
  
}