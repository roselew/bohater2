import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'welcome',
  template: `
    <p>
      Bohater Tygodnia wita!
    </p>
    <button routerLink='/rodzic-logowanie'>RODZIC</button>
    <button routerLink='/dziecko-logowanie'>DZIECKO</button>
  `,
  styles: [],
 
})
export class WelcomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
