import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { GiftsService } from '../gifts/gifts.service';

@Component({
  selector: 'gifts',
  template: `

   <div *ngIf="(chosenGifts && chosenGifts.length>0)" class="chosenGiftsPanel">
     <div class="panelTitle">
         <p>{{kid['name']}} wybrało nagrodę</p>
    </div>
  
    <ul class="mission-neutral"
      *ngFor="let userGift of chosenGifts">
      <li class="circle-big"> 
        <p> {{userGift.name}} </p>
        <img src="{{userGift.icon}}">
        <star-svg></star-svg>
        <span>{{userGift.points}}</span>
     </li> 
     <div class='buttonPanel'>
      <button (click)="receive(userGift)">Kup nagrodę</button>
      <button (click)="receive(userGift)" class="altButton">Potwierdź odbiór</button>
    </div>

    </ul>

 </div>

<p class="smallTitle">Dziecko ma {{totalPoints}} punktów </p>

  <ul class="mission-neutral mission-done">
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


<p *ngIf="(receivedGifts && receivedGifts.length>0)" class="smallTitle">Nagrody już zdobyte</p>

<ul class="mission-neutral mission-unactive">
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
  styles: [`
  .mission-neutral li.circle-big{
    margin: 2rem 4% 7rem 4%;
  }
  .chosenGiftsPanel{
    width: 100%;
    background-color:#f5f5f5;
    margin: 4rem 0; 
  }
  .chosenGiftsPanel li.circle-big{
    margin-top: 4rem;
    margin-bottom: 12rem;
  }

  .buttonPanel {
    vertical-align: top;
  }
  .buttonPanel button {
    margin-bottom: 10px;
  }

 }

  `],
})
export class GiftsComponent implements OnInit {

  constructor(    
    private service: GiftsService,
    private router: Router,
    private route:ActivatedRoute,
  ) { }

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
    this.kid['id'] = +this.route.parent.snapshot.paramMap.get('kidId');
    this.fetchGifts()
  }

 fetchGifts(){
       this.service.getMissionsGiftsPoints(this.kid['id'])
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
    this.totalPoints = 0
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


  receive(gift){
      gift['status']='received';
      this.service.updateOneGift(this.gift)
        .subscribe( ()=> this.fetchGifts() );
  };
  

}
