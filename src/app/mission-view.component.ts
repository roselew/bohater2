import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'mission-view',
  template: `
    <p>
      mission-view works!
    </p>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None
})
export class MissionViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
