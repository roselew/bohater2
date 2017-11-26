import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'kid-missions',
  template: `
   <div class="container">
    <kid-one-day></kid-one-day>
    </div>
  `,
  styles: [],

})
export class KidMissionsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
