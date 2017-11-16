import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'kid-hero',
  template: `
  <p> Bohater <p>
  <button routerLink='/dziecko'>Powrót do menu </button>
  `,
  styles: [],

})
export class KidHeroComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
