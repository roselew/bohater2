import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'gifts-to-receive',
  template: `
  
   <img *ngIf="totalToReceive>0" src="../../assets/gift.svg" class="enlarge">
   <img *ngIf="totalToReceive==0" src="../../assets/gift_empty.svg" class="enlarge">
   <p> Nagrody do odbioru </p>
   <star-svg><span>0</span></star-svg>
   <span>{{totalToReceive}}</span>
  `,
  styles: [],
})
export class GiftsToReceiveComponent implements OnInit {

  constructor() { }

  @Input()
  userGifts

  totalToReceive

  ngOnInit() {}
  ngOnChanges(){
     this.totalToReceive = this.userGifts.filter(x => x.status==='chosen').length;
  }

}
