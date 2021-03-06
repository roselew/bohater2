import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { GiftsService } from '../services/gifts.service';
import { UsersService } from "../services/users.service";
import { MissionsService } from '../services/missions.service';

@Component({
  selector: 'kid-gifts',
  template: `

  <p *ngIf="userGifts && userGifts.length==0" class="smallTitle"> 
     Nie masz żadnych nagród. Poproś rodzica o dodanie.
  </p>

 <p *ngIf="userGifts && userMissions && extraPoints" class="smallTitle">W sumie zdobyłeś już {{allPoints}} punkty! <br> Na nagrody zostało {{totalPoints}} pkt.</p>


  <ul class="mission-neutral mission-done mission-active">
    <li *ngFor="let userGift of availableGifts"
    class="circle-big"
    (click)="select(userGift)">  

      <p>{{ userGift.name }} </p>
      <img src="{{userGift.icon}}">
      <star-svg></star-svg>
      <span> {{userGift.points}}</span>
      
       <div class="progress">
        <div class="progress-undone"></div>
        <div class="progress-done" [ngStyle]="{'width' : getWidth(userGift) + '%'}">
        <p> Możes odebrać nagrodę</p>
        </div>
      </div>

    </li> 
  </ul>

  <ul class="mission-neutral mission-active">
    <li *ngFor="let userGift of unusedGifts"
    class="circle-big"> 

      <p>{{ userGift.name }} </p>
      <img src="{{userGift.icon}}">
      <star-svg></star-svg>
      <span> {{userGift.points}}</span>
      
       <div class="progress">
        <div class="progress-undone"></div>
        <div class="progress-done" [ngStyle]="{'width' : getWidth(userGift) + '%'}">
          <p> Jeszcze tylko {{userGift.points-totalPoints}} pkt ... </p>
        </div>
      </div>

    </li> 
  </ul>

  
  <p *ngIf="chosenGifts && chosenGifts.length>0" class="smallTitle">Czekamy na potwierdzenie przez rodzica</p>
  <ul class="mission-neutral mission-wait"> 
    <li *ngFor="let userGift of chosenGifts" 
      class="circle-big">
      <p>{{ userGift.name }} </p>
      <img src="{{userGift.icon}}">
      <star-svg></star-svg>
      <span> {{userGift.points}}</span>
    </li> 
  </ul> 

  <p *ngIf="extraPoints && extraPoints.length>0" class="smallTitle">Zdobyte punkty ekstra</p>
  <ul  class="mission-neutral"> 
  <li *ngFor="let extraPoint of extraPoints"
    class="circle-big">
    <p>{{ extraPoint.description }} </p>
    <img style="height:60%" src="assets/like.svg">
    <star-svg></star-svg>
    <span> {{extraPoint.points}}</span>
  </li>

  <p *ngIf="receivedGifts && receivedGifts.length>0" class="smallTitle">Zdobyte nagrody</p>
  <ul  class="mission-neutral"> 
    <li *ngFor="let userGift of receivedGifts"
      class="circle-big">
      <p>{{ userGift.name }} </p>
      <img src="{{userGift.icon}}">
      <star-svg></star-svg>
      <span> {{userGift.points}}</span>
    </li> 
  </ul>  






<!-- pop up window for changing mission status -->
  <div *ngIf="selectedGift" class="alert">
    <span class="X" (click)="selectedGift=null"> X </span>

    <ul class="mission-neutral">
      <li class="circle-big">
        <p> {{selectedGift.name}} </p>
        <img src="{{selectedGift.icon}}">
        <star-svg></star-svg>
        <span>{{selectedGift.points}}</span>
      </li>
    </ul>

    <button (click)="chose(selectedGift)">Odbieram nagrodę</button>
    <button (click)="selectedGift=undefined">Zbieram punkty dalej</button>

  </div>

  <a [routerLink]="['../']">
    <div class="back">←</div>
  </a>

`,
  styleUrls: ['../../sass/kid-gifts.scss'],
})


export class KidGiftsComponent implements OnInit {

  constructor(   
    private users: UsersService,
    private giftsService: GiftsService,
    private missionsService: MissionsService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  kid = {};
  userMissions
  userGifts
  allPoints=0
  totalPoints = 0
  unusedGifts
  availableGifts
  chosenGifts
  receivedGifts
  extraPoints
  selectedGift
  kidId

 ngOnInit(){
    this.kidId = this.users.getLoggedUser('kid');
    this.fetchGifts();
  }

  fetchGifts(){
    this.giftsService.fetchGifts(this.kidId)
    .subscribe( userGifts => {
      this.userGifts = userGifts
      this.chosenGifts = this.userGifts.filter (x => x.status==='chosen');
      this.receivedGifts = this.userGifts.filter (x => x.status==='received'); 

      this.missionsService.fetchMissions(this.kidId)
        .subscribe( userMissions => {
          this.userMissions = userMissions

        })
      this.giftsService.fetchExtraPoints(this.kidId)
        .subscribe (extraPoints => {
          this.extraPoints = extraPoints

          this.calculatePoints();
          this.unusedGifts = this.userGifts.filter( x => x.status==='unused').filter( x => x.points > this.totalPoints);  
          this.availableGifts = this.userGifts.filter( x => x.status==='unused').filter( x => x.points <= this.totalPoints);
        
        })
    }) 
 }

  calculatePoints(){
    this.allPoints = 0;
    this.totalPoints = 0;
    for (let mission of this.userMissions){
      this.allPoints += mission['doneDates'].length * parseInt(mission['points'])
      this.totalPoints += mission['doneDates'].length * parseInt(mission['points'])
    }
    for (let gifts of this.chosenGifts){
      this.totalPoints -= parseInt(gifts['points'])
    }
    for (let gifts of this.receivedGifts){
      this.totalPoints -= parseInt(gifts['points'])
    }
    for (let points of this.extraPoints){
      this.allPoints += parseInt(points['points'])
      this.totalPoints += parseInt(points['points'])
    }
  }

  select(userGift){
    this.selectedGift=userGift;
  }

  chose(gift){
      this.selectedGift=undefined
      gift['status']='chosen';
      let today = new Date().setHours(0,0,0,0);
      gift['chosenDate']=today;
      this.giftsService.updateOneGift(gift,gift['id'])
     .subscribe( ()=> {
        this.fetchGifts();
      });
  }

  getWidth(userGift){
    return Math.min(100*this.totalPoints/userGift.points,100)
  }
}



