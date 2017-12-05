import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Location} from "@angular/common";

@Component({
  selector: 'kid-gifts',
  template: `

  <div class="container">

  <ul class="mission-done">
  <li *ngFor="let userGift of availableGifts"
  class="circle-big"
  (click)="select(userGift)">  
  <p>{{ userGift.name }} </p>
  <img src="{{userGift.icon}}">
  <star-svg></star-svg>
  <span> {{userGift.points}}</span>
  <div class="progress">
    <div class="progress-undone"></div>
    <div class="progress-wait" style="width:80%"></div>
    <div class="progress-done" style="width:{{totalPoints/userGift.points}}">
      <p> {{totalPoints}} / {{userGift.points}} </p>
    </div>
  </div>
  </li> 
</ul>

  <ul class="mission-neutral">
    <li *ngFor="let userGift of unusedGifts"
    class="circle-big"> 
    <p>{{ userGift.name }} </p>
    <img src="{{userGift.icon}}">
    <star-svg></star-svg>
    <span> {{userGift.points}}</span>
    <div class="progress">
      <div class="progress-undone"></div>
      <div class="progress-wait" style="width:80%"></div>
      <div class="progress-done" style="width:{{totalPoints/userGift.points}}">
        <p> {{totalPoints}} / {{userGift.points}} </p>
      </div>
    </div>
    </li> 
  </ul>

  
    <p class="smallTitle">Czekamy na potwierdzenie przez rodzica</p>
    <ul class="mission-wait"> 
      <li *ngFor="let userGift of chosenGifts" 
        class="circle-big">
        <p>{{ userGift.name }} </p>
        <img src="{{userGift.icon}}">
        <star-svg></star-svg>
        <span> {{userGift.points}}</span>
      </li> 
    </ul> 

    <p class="smallTitle">Dostałeś już te nagrody</p>
    <ul  class="mission-neutral mission-unactive"> > 
      <li *ngFor="let userGift of receivedGifts"
        class="circle-big">
        <p>{{ userGift.name }} </p>
        <img src="{{userGift.icon}}">
        <star-svg></star-svg>
        <span> {{userGift.points}}</span>
      </li> 
    </ul> 

    </div>

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

 <button (click)="moveDown(selectedMission,missionStatus)"></div>    
 <button class="altButton" (click)="moveUp(selectedMission,missionStatus)"></div>  
  
</div>

  `,
  styleUrls: ['../../sass/kid-gifts.scss'],
})


export class KidGiftsComponent implements OnInit {

  constructor(    
    private router: Router,
    private http: HttpClient,
    private route:ActivatedRoute,
    private location:Location,) { }

  kid = {};
  userMissions
  userGifts
  totalPoints = 0
  unusedGifts
  availableGifts
  chosenGifts
  receivedGifts
  extraPoints
  selectedGift

  select(userGift){
    this.selectedGift=userGift;
  }


  ngOnInit(){
    this.kid['id'] = +localStorage.getItem('loggedKid');
    this.http.get('http://localhost:3000/kids/'+this.kid['id']+'?_embed=userMissions&_embed=userGifts&_embed=extraPoints')
      .subscribe( kid => {
        this.kid = kid;
        this.userMissions = this.kid['userMissions'];
        this.userGifts = this.kid['userGifts'];
        this.chosenGifts = this.userGifts.filter (x => x.status==='chosen');
        this.receivedGifts = this.userGifts.filter (x => x.status==='received'); 
        this.extraPoints = this.kid['extraPoints'];
        this.calculatePoints();
        //dopiero po policzeniu punktów mogę pokazać które nagrody można wybrać
        this.unusedGifts = this.userGifts.filter( x => x.status==='unused').filter( x => x.points > this.totalPoints);  
        this.availableGifts = this.userGifts.filter( x => x.status==='unused').filter( x => x.points <= this.totalPoints);
      })
  }


  calculatePoints(){
    for (let mission of this.userMissions){
      this.totalPoints += mission['doneDates'].length * parseInt(mission['points'])
    }
    for (let gifts of this.chosenGifts){
      this.totalPoints -= parseInt(gifts['points'])
    }
    for (let gifts of this.receivedGifts){
      this.totalPoints -= parseInt(gifts['points'])
    }
    for (let points of this.extraPoints){
      this.totalPoints += parseInt(points['points'])
    }
  }

}
