import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Location} from "@angular/common";

@Component({
  selector: 'kid-gifts',
  template: `

<div class="container">

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
          <p> {{totalPoints}} / {{userGift.points}} </p>
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
          <p> {{totalPoints}} / {{userGift.points}} </p>
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

  <p *ngIf="receivedGifts && receivedGifts.length>0" class="smallTitle">Dostałeś już te nagrody</p>
  <ul  class="mission-neutral mission-unactive"> 
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

 ngOnInit(){
    let kidId = +localStorage.getItem('loggedKid');
    this.fetchGifts(kidId);
  }

fetchGifts(kidId){
    this.http.get('http://localhost:3000/kids/'+kidId+'?_embed=userMissions&_embed=userGifts&_embed=extraPoints')
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
    this.totalPoints = 0;
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

  select(userGift){
    this.selectedGift=userGift;
  }

  chose(gift){
      this.selectedGift=undefined
      gift['status']='chosen';
      let today = new Date().setHours(0,0,0,0);
      gift['chosenDate']=today;
      this.http.put('http://localhost:3000/userGifts/'+ gift['id'], gift)
     .subscribe( ()=> {
        let kidId = +localStorage.getItem('loggedKid');
        this.fetchGifts(kidId);
      });
  }

  getWidth(userGift){
    return Math.min(100*this.totalPoints/userGift.points,100)
  }
}



