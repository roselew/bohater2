import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'kid-progress',
  template: `
  <one-week [mode]=" 'kid' "></one-week>
  `,
  styles: [],

})
export class KidProgressComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
