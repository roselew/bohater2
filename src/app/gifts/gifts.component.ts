import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Location} from "@angular/common";

@Component({
  selector: 'gifts',
  template: `

  <p>Dziecko ma {{totalPoints}} punktów </p>

  <p>Lista nagród dziecka niewykorzystanych ale dostępnych</p>

  <ul class="mission-neutral">
  <li 
    *ngFor="let userGift of availableGifts" 
    [routerLink]="['dostepne/'+userGift.id]"
    class="circle-big"> 
      <p>
        {{userGift.name}}
      </p>
      <img src="{{userGift.icon}}">
      <star-svg></star-svg>
      <span>{{userGift.points}}</span>
  </li> 
</ul>

<p>Lista nagród dziecka niewykorzystanych</p>

<ul class="mission-neutral">
<li 
  *ngFor="let userGift of unusedGifts" 
  [routerLink]="[userGift.id]"
  class="circle-big"> 
    <p>
      {{userGift.name}}
    </p>
    <img src="{{userGift.icon}}">
    <star-svg></star-svg>
    <span>{{userGift.points}}</span>
</li> 
</ul>

    <p>Lista nagród wybranych przez dziecko do odbioru</p>

    <ul class="mission-neutral">
    <li 
      *ngFor="let userGift of chosenGifts" 
      [routerLink]="['wybrane/'+userGift.id]"
      class="circle-big"> 
        <p>
          {{userGift.name}}
        </p>
        <img src="{{userGift.icon}}">
        <star-svg></star-svg>
        <span>{{userGift.points}}</span>
    </li> 
    </ul>


    <p>Lista nagród już odebranych</p>

    <ul class="mission-neutral">
    <li 
      *ngFor="let userGift of receivedGifts" 
      class="circle-big"> 
        <p>
          {{userGift.name}}
        </p>
        <img src="{{userGift.icon}}">
        <star-svg></star-svg>
        <span>{{userGift.points}}</span>
    </li> 
    </ul>


    <div class="plus" routerLink="dodaj">+</div>
  
  `,
  styles: [],
})
export class GiftsComponent implements OnInit {

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


  ngOnInit(){
    this.kid['id']=this.route.parent.snapshot.paramMap.get('kidId');
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
