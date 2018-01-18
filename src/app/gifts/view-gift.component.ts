import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'view-gift',
  template: `
  <ul class="mission-neutral">
    <li class="circle-big">
      <img src="{{gift.icon}}">
    </li>
  </ul>
  <form class="newGiftForm">
    <input type="text" name="newGiftName" placeholder="Nazwa prezentu" [(ngModel)]="gift.name">
    <p>Liczba punktów</p>
    <span class="less" (click)="lessPoints()">-</span><input type="number" name="newGiftPoints" placeholder="Liczba punktów" [(ngModel)]="+gift.points"><span class="more" (click)="morePoints()">+</span>
  </form>
  `,
  styles: [`
  .mission-neutral {
    height: 12rem;    
  }
  `],

})
export class ViewGiftComponent implements OnInit {

@Input() 
gift 

lessPoints(){
  if(this.gift.points && this.gift.points>0){
    this.gift.points-=1;
  } else {
    this.gift.points =0;
  }
}
morePoints(){
  if(this.gift.points){
    this.gift.points+=1
  } else {
    this.gift.points = 1;
  }  
}

  constructor() { }

  ngOnInit() {
  }

}
