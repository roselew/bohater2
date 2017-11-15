import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'gifts-to-receive',
  template: `
    <p> {{totalToReceive}} nagrody do odbioru </p>
  `,
  styles: [],
})
export class GiftsToReceiveComponent implements OnInit {

  constructor() { }

  @Input()
  userGifts

  totalToReceive

  ngOnInit() {
     this.totalToReceive = this.userGifts.filter(x => x.status==='chosen').length;
  }

}
