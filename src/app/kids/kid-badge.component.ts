import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'kid-badge',
  template: `
    <p>Wybór odznaki</p>
    <button routerLink='../'>Powrót do bohatera </button>
  `,
  styles: [],
})
export class KidBadgeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
