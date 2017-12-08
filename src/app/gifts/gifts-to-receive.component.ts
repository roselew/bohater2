import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'gifts-to-receive',
  template: `
  
   <img *ngIf="totalToReceive>0" src="../../assets/gift.svg" class="enlarge">
   <img *ngIf="totalToReceive==0" src="../../assets/gift_empty.svg" class="enlarge">
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
