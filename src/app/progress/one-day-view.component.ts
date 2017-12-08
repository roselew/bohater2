import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';

@Component({
  selector: 'one-day-view',
  template: `

  <div class="day" *ngIf="(type=='weekView')"> 
    
      <p *ngIf="(filter=='all')" (click)="showDetails()" [ngClass]="{'selected': details }">
        {{days[thisDay.getUTCDay()]}} 
        <span></span> 
      </p>

      <div *ngIf="(filter=='all')" class="day-line" (click)="showDetails()">
        <ul class="small-mission-undone">
          <li *ngFor="let mission of undoneMissions" class='circle-small'></li> 
        </ul>	
        <ul class="small-mission-wait">
          <li *ngFor="let mission of waitMissions" class='circle-small'></li> 
         </ul>		
        <ul class="small-mission-done">
          <li *ngFor="let mission of doneMissions" class='circle-small'></li> 
        </ul>		
      </div>



      <div *ngIf="( (filter=='all' && details) || filter!=='all')" class="day-details">

        <p *ngIf="(filter=='undone' && undoneMissions && undoneMissions.length>0)">{{days[thisDay.getUTCDay()]}}</p>
        <ul *ngIf="(filter=='all' || filter=='undone')" class="mission-undone"> 
          <li *ngFor="let mission of undoneMissions" 
            class='circle-mid'
            (click)="move(mission,'undone')"> 
            <img src="{{mission.icon}}">
            <star-svg></star-svg>
            <span>{{mission.points}}</span>
          </li> 
        </ul>			

        <p *ngIf="(filter=='wait' && waitMissions && waitMissions.length>0)">{{days[thisDay.getUTCDay()]}}</p>
        <ul *ngIf="(filter=='all'||filter=='wait')" class="mission-wait"> 
          <li *ngFor="let mission of waitMissions"
            class='circle-mid'
            (click)="move(mission,'wait')"> 
            <img src="{{mission.icon}}">
            <star-svg></star-svg>
            <span>{{mission.points}}</span>
          </li> 
        </ul>	

        <p *ngIf="(filter=='done' && doneMissions && doneMissions.length>0)">{{days[thisDay.getUTCDay()]}}</p>
        <ul *ngIf="(filter=='all'||filter=='done')" class="mission-done"> 
          <li *ngFor="let mission of doneMissions"
            class='circle-mid'
            (click)="move(mission,'done')"> 
            <img src="{{mission.icon}}">
            <star-svg></star-svg>
            <span>{{mission.points}}</span>
          </li> 
        </ul>	
      </div>		
      
   </div>



  <div class="day-view" *ngIf="(type=='dayView')">
  
      <div class = 'left-column'>
        <p class = "title">DO ZROBIENIA</p>
        
        <ul *ngIf = "undoneMissions && undoneMissions.length>0; else other_content" class="mission-undone"> 
          <li *ngFor="let mission of undoneMissions"
            class='circle-big'
            (click)="move(mission,'undone')"> 
            <img src="{{mission.icon}}">
            <star-svg></star-svg>
            <span>{{mission.points}}</span>
          </li> 
        </ul>	
        <ng-template #other_content><img src="assets/bohater.png" width="30%">
           <p class="smallTitle"> Brawo! <br> Nie masz już żadnych misji do wykonania !!!</p>
        </ng-template>
      </div>
      
      <div class="right-column">
        <p class = "title">ZROBIONE</p>
        
        <ul class="mission-wait"> 
          <li *ngFor="let mission of waitMissions"
            class='circle-big'
            (click)="move(mission,'wait')">
            <img src="{{mission.icon}}">
            <star-svg></star-svg>
            <span>{{mission.points}}</span>
          </li> 
        </ul>	
        <ul class="mission-done"> 
          <li *ngFor="let mission of doneMissions"
            class='circle-big'
            (click)="move(mission,'done')">
            <img src="{{mission.icon}}">
            <star-svg></star-svg>
            <span>{{mission.points}}</span>
          </li> 
        </ul>	
        
      </div>
      
  </div>	

<!-- pop up window for changing mission status -->

   <move-mission *ngIf="selectedMission"
    [mode]="mode"
    [selectedMission]="selectedMission"
    [missionStatus]="missionStatus"
    [data]="thisDay.getTime()"
    (onMove)="changeMissions.emit()">
  </move-mission>
 
`,
  
  styleUrls: ['../../sass/one-day-view.scss']

})

export class OneDayViewComponent implements OnInit {
   
  constructor() { }

  days = ['PN','WT','ŚR','CZ','PT','SB','ND']

  @Input() dayId
  
  @Input() mode
  
  @Input() type
  
  @Input() filter

  @Input() userMissions
  
  @Output('onChange')
  changeMissions = new EventEmitter();

  thisDay;
  doneMissions = [];
  waitMissions = [];
  undoneMissions = [];
  selectedMission
  missionStatus
  
  
 ngOnChanges(){
   //set thisDay 
   this.thisDay = new Date();
   this.thisDay.setDate(this.thisDay.getDate() + this.dayId);
   this.thisDay.setHours(0, 0, 0, 0);
   
   //missions are already fetched, now we need to get their status
   this.orderMissions();
 }

 ngOnInit() { }

 orderMissions() {
   this.waitMissions = this.service.getWaitMissions(this.userMissions,this.thisDay);
   this.doneMissions = this.service.getDoneMissions(this.userMissions,this.thisDay);
   this.undoneMissions = this.service.getUndoneMissions(this.userMissions, this.waitMissions, this.doneMissions);
 }

 move(mission,status){
  this.selectedMission=mission;
  this.missionStatus=status;
 } 
  
 // show and hide day details div
 details = false
 showDetails(){
   if (this.filter=='all') {
    this.details=!this.details
   }
 }
  
}
