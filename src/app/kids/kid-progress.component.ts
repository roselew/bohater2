import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'kid-progress',
  template: `
  <one-week [mode]=" 'kid' "></one-week>

  <a [routerLink]="['../../']">
    <div class="back">←</div>
  </a>

  `,
  styles: [],

})
export class KidProgressComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
