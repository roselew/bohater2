import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'kid-menu',
  template: `
    <p>Witaj dziecko</p>
    <button routerLink='misje'>MISJE</button>
    <button routerLink="nagrody">NAGRODY></button>
    <button routerLink="bohater">BOHATER</button>
    <button routerLink="odznaki">ODZNAKI</button>
  `,
  styles: [],

})
export class KidMenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
