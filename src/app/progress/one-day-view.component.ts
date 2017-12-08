import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { MissionsService } from '../missions/missions.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from "../sessions/users.service";

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
  <div *ngIf="selectedMission" class="alert">
  <span class="X" (click)="selectedMission=null"> X </span>

  <ul class="mission-neutral">
    <li class="circle-big">
      <p>
      {{selectedMission.name}}
      </p>
      <img src="{{selectedMission.icon}}">
      <star-svg></star-svg>
      <span>{{selectedMission.points}}</span>
  
      <div class="thumb thumb-down" (click)="moveDown(selectedMission,missionStatus)"><img src="assets/dislike.svg"></div>    
      <div class="thumb thumb-up" (click)="moveUp(selectedMission,missionStatus)"><img src="assets/like.svg"></div>     
    </li>
  </ul>
  
</div>

<app-alert *ngIf="alertVisible" (change)="alertVisible=false" [imageSrc]="alertImage" [textTitle]="alertTitle" [textPlain]="alertText"></app-alert>
 
`,
  styleUrls: ['../../sass/one-day-view.scss']

})
export class OneDayViewComponent implements OnInit {
//   <move-mission 
//   *ngIf="selectedMission" 
//   [selectedMission]="selectedMission" 
//   [missionStatus]="missionStatus">
// </move-mission>
   
  constructor(
    private users: UsersService,
    private service: MissionsService,
    private router: Router,
    private route:ActivatedRoute,
  ) { }

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
  
  //ALERTS
  alertVisible
  alertImage
  alertText
  alertTitle

  showAlert(imageSrc, textTitle, textPlain){
    this.alertVisible=true
    this.alertImage=imageSrc 
    this.alertText=textPlain 
    this.alertTitle=textTitle
  }

  hideAlert(){
    this.alertVisible=false
    this.alertImage="" 
    this.alertText=""
    this.alertTitle=""
  }

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

 moveUp(mission,status){
  this.selectedMission=undefined
  if (this.mode == 'parent'){
    if (status!=='done'){
      this.addDone(mission)
    } else {
      this.showAlert('assets/like.svg','','Ta misja jest już wykonana')
    }
  } else {
    if (status=='undone'){
      this.addWait(mission)
      this.showAlert('assets/bohater.png','Gratulacje','Super Ci idzie!')
    } else if (status=='wait'){
      this.showAlert('assets/hourglass.svg','Czekamy','...na akceptację mamy')
    } else if (status=='done'){
      this.showAlert('assets/like.svg','Zrobione','Już wykonałeś tą misję')
    }
  }
  }

  moveDown(mission,status){
    this.selectedMission=undefined
    if (this.mode == 'parent'){
      if (status=='done'){
        this.removeDone(mission)
      } else if (status=='wait'){
        this.removeWait(mission)
      } else {
        this.showAlert('assets/dislike.svg','','Misja nadal nie jest wykonana')
      }
    } else {
      if (status=="undone"){
        this.showAlert('assets/dislike.svg','Niestety','Misja nadal nie jest wykonana')
      } else if (status=="wait"){
        this.removeWait(mission)
        this.showAlert('assets/dislike.svg','Niestety','Nie wykonałeś tej misji')
      } else if (status=="done"){
        this.removeDone(mission)
        this.showAlert('assets/dislike.svg','Niestety','Nie wykonałeś tej misji')
      }

    }
  }


  addDone(mission) {
    let data=this.thisDay.getTime()
    let updatedMission={};
    this.service.getOneMission(mission.id)
      .subscribe(userMission => {
        updatedMission = userMission;
        updatedMission['doneDates'].push(data);
        if (updatedMission['waitDates'].indexOf(data)>-1){
          let index = updatedMission['waitDates'].indexOf(data)
          updatedMission['waitDates'].splice(index,1)
        }  
        this.service.updateOneMission(updatedMission)
          .subscribe(() => this.changeMissions.emit());
      })
  }
  
  removeDone(mission){
    let data=this.thisDay.getTime()
    let updatedMission={};
    this.service.getOneMission(mission.id)
    .subscribe(userMission => {
      updatedMission = userMission;
      if (updatedMission['doneDates'].indexOf(data)>-1){
        let index = updatedMission['doneDates'].indexOf(data)
        updatedMission['doneDates'].splice(index,1)
      }  
      this.service.updateOneMission(updatedMission)
        .subscribe(() => this.changeMissions.emit());
    })
  }
 
  removeWait(mission){
    let data=this.thisDay.getTime()
    let updatedMission={};
    this.service.getOneMission(mission.id)
    .subscribe(userMission => {
      updatedMission = userMission;
      if (updatedMission['waitDates'].indexOf(data)>-1){
        let index = updatedMission['waitDates'].indexOf(data)
        updatedMission['waitDates'].splice(index,1)
      }  
      this.service.updateOneMission(updatedMission)
        .subscribe(() => this.changeMissions.emit());
    })
  }
  
  addWait(mission) {
    if (!mission.confirmation){
      this.addDone(mission)
    } else {
    let data=this.thisDay.getTime()
    let updatedMission={};
    this.service.getOneMission(mission.id)
      .subscribe(userMission => {
        updatedMission = userMission;
        updatedMission['waitDates'].push(data);
        this.service.updateOneMission(updatedMission)
          .subscribe(() => this.changeMissions.emit());
      })
    }
  }
  
 details= false
 showDetails(){
   if (this.filter=='all') {
    this.details=!this.details
   }
 }
}
