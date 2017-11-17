import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'kid-progress',
  template: `
  <p> Odznaki </p>

  <one-week></one-week>
  
  <button routerLink='/dziecko'>Powrót do menu </button>
  `,
  styles: [],

})
export class KidProgressComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
