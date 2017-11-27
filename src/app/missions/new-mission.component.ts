import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'new-mission',
  template: `
    <h1>Wybierz misje</h1>
    <h2>polecane przez ekspertów</h2>
    <span class="X" routerLink='../'> X </span>

    <expert-missions></expert-missions>

    <button routerLink="../dodaj-wlasna">... lub utwórz własną</button>

  `,
  styles: [],

})
export class NewMissionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
