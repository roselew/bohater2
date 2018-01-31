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

    <span class="less" (click)="lessPoints()">-</span><input type="number" name="newMissionPoints" placeholder="Punkty" [(ngModel)]="+mission.points"><span class="more" (click)="morePoints()">+</span>
    
    <p>W które dni tygodnia?</p>
    </form>
    
    
    <div class="newMissionDays">
      <label *ngFor="let day of days">
        <input type="checkbox"
                value="{{day.value}}"
                [(ngModel)]="day.checked"
                name="day.name">
        
        <span>{{day.name}}</span>    
      </label>     
    </div>

 
  <div class="remember">
  <label class="confirmation-label remember">
    <input  type="checkbox" 
            [(ngModel)]="mission.confirmation">
            <span>X</span><p> Wykonanie misji musi być potwierdzone przez rodzica</p>
  </label>
   </div>

  `,
  styles: [`
  .mission-neutral {
    height: 12rem;    
  }
  `]

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

  ngOnInit() {}

}
