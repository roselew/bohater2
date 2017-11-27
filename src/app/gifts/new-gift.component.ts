import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'new-gift',
  template: `
  <div class="edit">
  <h1> Wybierz nagrody </h1>
  <h2> polecane przez ekspertów </h2>
  <span class="X" routerLink='../'> X </span>

  <expert-gifts></expert-gifts>

  <button routerLink="../dodaj-wlasna">... lub utwórz własną</button>
</div>
  `,
  styles: [],

})
export class NewGiftComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
