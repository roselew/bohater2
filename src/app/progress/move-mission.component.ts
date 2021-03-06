import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MissionsService } from "../services/missions.service";

@Component({
  selector: 'move-mission',
  template: `

<div class="alert" *ngIf="selectedMission">
  
  <span class="X" (click)="clearSelection()"> X </span>  
  <ul class="mission-neutral">
    <li class="circle-big">
      <p> {{selectedMission.name}} </p>
      <img src="{{selectedMission.icon}}">
      <star-svg></star-svg>
      <span>{{selectedMission.points}}</span>
      <div class="thumb thumb-down" (click)="moveDown(selectedMission)"><img src="assets/dislike.svg"></div>   
      <div class="thumb thumb-up" (click)="moveUp(selectedMission)"><img src="assets/like.svg"></div> 
    </li>  
   </ul>

</div>

<app-alert *ngIf="alertVisible" 
  (change)="alertVisible=false" 
  [imageSrc]="alertImage" 
  [textTitle]="alertTitle" 
  [textPlain]="alertText">
</app-alert>

  `,
  styles: [],

})
export class MoveMissionComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,  
    private service: MissionsService, 
  ) { }

  ngOnInit() {  }

  @Input() mode
  
  @Input() selectedMission

  @Input() missionStatus

  @Input() data

  @Input() heroImage

  
  @Output('onMove')
  moveMission = new EventEmitter();

  @Output('onFinish')
  finishSelection = new EventEmitter();
  
  clearSelection(){
    this.finishSelection.emit()
  }

  moveUp(mission) {
    this.clearSelection()
    if (this.mode == 'parent'){
      if (this.missionStatus!=='done'){
        this.addDone(mission)
      } else {
        this.showAlert('assets/like.svg','','Ta misja jest już wykonana')
      }
    } else {
      if (this.missionStatus=='undone'){
        this.addWait(mission)
        this.showAlert(this.heroImage,'Gratulacje','Super Ci idzie!')
      } else if (this.missionStatus=='wait'){
        this.showAlert('assets/hourglass.svg','Czekamy','...na akceptację mamy')
      } else if (this.missionStatus=='done'){
        this.showAlert('assets/like.svg','Zrobione','Już wykonałeś tą misję')
      }
    }
  }
  
  moveDown(mission) {
      this.clearSelection()
      if (this.mode == 'parent'){
        if (this.missionStatus=='done'){
          this.removeDone(mission)
        } else if (this.missionStatus=='wait'){
          this.removeWait(mission)
        } else {
          this.showAlert('assets/dislike.svg','','Misja nadal nie jest wykonana')
        }
      } else {
        if (this.missionStatus=="undone"){
          this.showAlert('assets/dislike.svg','Niestety','Misja nadal nie jest wykonana')
        } else if (this.missionStatus=="wait"){
          this.removeWait(mission)
          this.showAlert('assets/dislike.svg','Niestety','Nie wykonałeś tej misji')
        } else if (this.missionStatus=="done"){
          this.removeDone(mission)
          this.showAlert('assets/dislike.svg','Niestety','Nie wykonałeś tej misji')
        }
      }
    }
  
  addWait(mission) {
    if (!mission.confirmation){
      this.addDone(mission)
    } else {
      mission['waitDates'].push(this.data)
      this.updateMission(mission)
    }
  }
  
  addDone(mission){
    mission['doneDates'].push(this.data)
    //check if it was WAIT before
    let index = mission['waitDates'].indexOf(this.data)
    if (index>-1){
      mission['waitDates'].splice(index,1)
    }
    this.updateMission(mission)
  }
  
  removeDone(mission){
    let index = mission['doneDates'].indexOf(this.data)
    if (index>-1){
      mission['doneDates'].splice(index,1)
      this.updateMission(mission)
    }
   }
  
   removeWait(mission){
     let index = mission['waitDates'].indexOf(this.data)
     if (index >-1){
       mission['waitDates'].splice(index,1)
       this.updateMission(mission)
     }
   }
   
  updateMission(mission){
    this.service.updateOneMission(mission,mission.id)
      .subscribe( () => {
        this.moveMission.emit();
    })
  }

  //obsługa alertów
  alertVisible = false
  alertImage
  alertText
  alertTitle
  
  showAlert(imageSrc,textTitle,textPlain){
    this.alertVisible = true
    this.alertImage = imageSrc
    this.alertText = textPlain
    this.alertTitle = textTitle
  }
  
  hideAlert(){
    this.alertVisible = false
    this.alertImage=""
    this.alertText=""
    this.alertTitle=""
  }
  
  
}
