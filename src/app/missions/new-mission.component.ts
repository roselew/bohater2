import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'new-mission',
  template: `
  <div class="edit">
    <h1>Wybierz misje</h1>
    <h2>polecane przez ekspertów</h2>
    <span class="X" routerLink='../'> X </span>

    <expert-missions></expert-missions>

    <button routerLink="../dodaj-wlasna">... lub utwórz własną</button>
  </div>
  `,
  styles: [],

})
export class NewMissionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
