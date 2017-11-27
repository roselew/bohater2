import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'view-gift',
  template: `
  
  <span class="X" onclick="hideEdit()"> X </span>
  <ul class="mission-neutral">
    <li class="circle-big">
      <img src="{{gift.icon}}">
    </li>
  </ul>
  <form class="newGiftForm">
    <input type="text" name="newGiftName" placeholder="Nazwa prezentu" [(ngModel)]="gift.name">
    <p>Liczba punktów</p>
    <span class="less">-</span>
    <input type="number" name="newGiftPoints" placeholder="Liczba punktów" [(ngModel)]="gift.points">
    <span class="more">+</span>
  </form>
  `,
  styles: [],

})
export class ViewGiftComponent implements OnInit {

@Input() 
gift 
  constructor() { }

  ngOnInit() {
  }

}
