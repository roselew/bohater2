import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'view-mission',
  template: `
  
  <ul class="mission-neutral">
    <li class="circle-big">
        <img src="{{mission.icon}}">
    </li>
  </ul>
  
  <form class=newMissionForm>
  
  <input type="text" name="newMissionName" placeholder="Nazwa misji" [(ngModel)]="mission.name">

    <p>Liczba punktów</p>

    <span class="less">-</span>
    <input type="number" name="newMissionPoints" placeholder="Liczba punktów" [(ngModel)]="mission.points">
    <span class="more">+</span>

    <p>W które dni tygodnia?</p>
    
    <div class="newMissionDays">
        <input type="checkbox" name="newMissionDays" id="givenDay0" value="0">
        <label for="givenDay0">PN</label>
        
        <input type="checkbox" name="newMissionDays" id="givenDay1" value="1">
        <label for="givenDay1">WT</label>
        
        <input type="checkbox" name="newMissionDays" id="givenDay2" value="2">
        <label for="givenDay2">ŚR</label>
        
        <input type="checkbox" name="newMissionDays" id="givenDay3" value="3">
        <label for="givenDay3">CZ</label>
        
        <input type="checkbox" name="newMissionDays" id="givenDay4" value="4">
        <label for="givenDay4">PT</label>
        
        <input type="checkbox" name="newMissionDays" id="givenDay5" value="5">
        <label for="givenDay5">SB</label>
        
        <input type="checkbox" name="newMissionDays" id="givenDay6" value="6">
        <label for="givenDay6">ND</label></div>


    </form>

   <div class="form-group">
   <label for="days">Days:</label>
   <div *ngFor="let day of days">
       <label>
           <input type="checkbox"
                   name="days"
                   value="{{day.value}}"
                   [(ngModel)]="day.checked"/>
           {{day.name}}
       </label>
   </div>
 </div>

   <label>
   <input type="checkbox" 
          [(ngModel)]="mission.confirmation">
   Confirmation</label>
  `,
  styles: [],

})
export class ViewMissionComponent implements OnInit {

  @Input() mission
  @Input() days

  constructor() { }

  ngOnInit() {
  }

}
