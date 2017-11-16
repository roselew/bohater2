import { Component, OnInit,} from '@angular/core';

@Component({
  selector: 'kid-gifts',
  template: `
 <p> Nagrody </p>
  <button routerLink='/dziecko'>Powrót do menu </button>>
  
  `,
  styles: [],

})
export class KidGiftsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
