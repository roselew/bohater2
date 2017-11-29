import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'view-mission',
  template: `
  
  <ul class="mission-neutral">
    <li class="circle-big">
        <img src="{{mission.icon}}">
    </li>
  </ul>
  

  <form class="newMissionForm">
  
    <input type="text" name="newMissionName" placeholder="Nazwa misji" [(ngModel)]="mission.name">

    <p>Liczba punktów</p>

    <span class="less" (click)="lessPoints()">-</span><input type="number" name="newMissionPoints" placeholder="Liczba punktów" [(ngModel)]="+mission.points"><span class="more" (click)="morePoints()">+</span>

    <p>W które dni tygodnia?</p>
    
    <div class="newMissionDays">
     
      <ng-container *ngFor="let day of days">
      
        <input type="checkbox"
                value="{{day.value}}"
                id="{{'givenDay'+day.value}}"
                [(ngModel)]="day.checked"
                name="days"/>
        
        <label for="{{'givenDay'+day.value}}">{{day.name}}</label>

      </ng-container>
      
    </div>
  </form>
  
  <label class="confirmation-label">
    <input type="checkbox" 
          [(ngModel)]="mission.confirmation">
    Wykonanie misji musi być potwierdzone przez rodzica
  </label>
   


  `,
  styles: [],

})
export class ViewMissionComponent implements OnInit {

  @Input() days
  @Input() mission
 

  lessPoints(){
    if(this.mission.points && this.mission.points>0){
      this.mission.points-=1;
    } else {
      this.mission.points =0;
    }
  }
  morePoints(){
    if(this.mission.points){
      this.mission.points+=1
    } else {
      this.mission.points = 1;
    }  
  }
  constructor() { }

  ngOnInit() {
    //  for (let i=0; i<7; i++){
    //   document.querySelectorAll("input[type='checkbox']")[i]['checked']=false
    //   }
   }

}
