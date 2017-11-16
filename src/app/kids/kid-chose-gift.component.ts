import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kid-chose-gift',
  template: `
    <p>
      Wybór nagrody
    </p>

    <button routerLink='../'>Powrót do nagród </button>
  `,
  styles: [],

})
export class KidChoseGiftComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
