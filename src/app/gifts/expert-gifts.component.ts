import { Component, OnInit } from '@angular/core';
import { ExpertsService } from "../services/experts.service";

@Component({
  selector: 'expert-gifts',
  template: `
  <ul class="mission-neutral">
    <span class="showMore bounce" (click)="showMore($event)">▼</span>
    <li *ngFor="let gift of gifts"
    class="circle-mid"
    [routerLink]="['../dodaj-polecana/' + gift.id]"> 
      <p>{{ gift.name }} </p>
      <img src="{{gift.icon}}">
  </li> 
</ul> 
  `,
  styles: [],
})
export class ExpertGiftsComponent implements OnInit {

  constructor(
    private experts: ExpertsService,
  ) { }

    gifts

  ngOnInit(){
    this.gifts = this.experts.getExpertGifts()
  }

 showMore(przycisk){
   let panel=document.getElementsByClassName('mission-neutral')[0]
   ;
   if (!panel['style'].height || panel['style'].height !=='auto'){
    panel['style'].height = 'auto';
    przycisk.target.innerHTML='&#x25B2';
   } else {
    panel['style'].height = '24rem';
    przycisk.target.innerHTML='&#x25BC';
   }  
  }

}
