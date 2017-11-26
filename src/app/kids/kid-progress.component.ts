import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'kid-progress',
  template: `
  <div class="container">
  <one-week></one-week>
  </div>
  `,
  styles: [],

})
export class KidProgressComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
