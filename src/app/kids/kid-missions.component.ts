import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'kid-missions',
  template: `
    <p>Misje</p>
    <kid-one-day></kid-one-day>
    <button routerLink='/dziecko'>Powrót do menu </button>
  `,
  styles: [],

})
export class KidMissionsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
