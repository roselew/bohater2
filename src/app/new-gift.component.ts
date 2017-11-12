import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'new-gift',
  template: `
  <p>
  Wybierz nagrodę z polecanych przez ekspertów albo...
  </p>
  <expert-gifts></expert-gifts>
  <button routerLink="../create-gift">... utwórz własną</button>
  `,
  styles: [],

})
export class NewGiftComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
