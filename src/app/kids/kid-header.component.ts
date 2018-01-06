import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'kid-header',
  template: `
  <header routerLink='/dziecko/menu'>
    <div *ngIf="kid" class="header-banner"> {{kid.name}} </div>
    <img src="../../assets/logoXL.png" class="logo">
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
