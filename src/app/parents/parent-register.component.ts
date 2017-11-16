import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'parent-register',
  template: `
    <button routerLink='/rodzic-logowanie'>ZALOGUJ</button>
  `,
  styles: [],

})
export class ParentRegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
