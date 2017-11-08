import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'new-mission',
  template: `
    <p>
      Wybierz misję z polecanych przez ekspertów albo...
    </p>
    <expert-missions></expert-missions>
    <button routerLink="../create-mission">... utwórz własną</button>
  `,
  styles: [],

})
export class NewMissionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
