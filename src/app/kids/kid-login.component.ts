import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'kid-login',
  template: `
  <button routerLink='/dziecko'>WEJDŹ</button>
  `,
  styles: [],

})
export class KidLoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
