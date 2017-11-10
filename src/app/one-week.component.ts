import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'one-week',
  template: `
    <p>
      one-week works!
    </p>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None
})
export class OneWeekComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
