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

    <span class="less">-</span>
    <input type="number" name="newMissionPoints" placeholder="Liczba punktów" [(ngModel)]="mission.points">
    <span class="more">+</span>

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
     
        <label>
        <input type="checkbox" 
               [(ngModel)]="mission.confirmation">
        Confirmation</label>

    </form>


  `,
  styles: [],

})
export class ViewMissionComponent implements OnInit {

  @Input() mission
  @Input() days


  constructor() { }

  ngOnInit() {console.log(this.days)
  }

}
