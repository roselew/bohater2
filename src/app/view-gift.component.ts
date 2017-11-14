import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'view-gift',
  template: `

  <label>Name</label>
  <input [(ngModel)]="gift.name">
  <label>Points</label>
  <input [(ngModel)]="gift.points">
  <label>Icon</label>
  <input [(ngModel)]="gift.icon">
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
