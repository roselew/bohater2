import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'progress',
  template: `
    <p>
      progress works!
    </p>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None
})
export class ProgressComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
