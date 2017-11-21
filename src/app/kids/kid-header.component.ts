import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'kid-header',
  template: `
  <header>
    <a routerLink='/dziecko/menu'>
      <div class="header-banner"> {{kid.name}} </div>
      <img src="../../assets/logo.png" class="logo">
    </a>
  </header>
  `,
  styles: [],

})
export class KidHeaderComponent implements OnInit {

  @Input()
  kid

  constructor() { }

  ngOnInit() {
  }

}
